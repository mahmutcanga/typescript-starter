# Building Persistency

Most of the applications require saving the data or state to a persistent storage. Regardless of the underlying storage engine, the higher layers of the application can integrate it via a simple abstraction and contract. For these purposes, a common way of implementing this abstraction is creating a Repository.

Repositories in an application usually cover the basic CRUDL operations

- Create
- Read
- Update
- Delete
- List

These operations usually map to endpoints for GET, POST, PUT, DELETE operations too. However, certain complex domain models may require combination of repositories to achieve their goals.

In our guide, we will focus on a simple CRU (Create, Read, Update) repository which allows:

- Creating a Bank Account
- Updating an existing Bank Account
- Reading an existing Bank Account details.

## Persistency Contract

A simple contract for our implementation can be achieved defining following interface.

Create `bank-account-repository.ts` under `app/src/bank-account/repository` folder:

```typescript
import { ServiceResult } from '../../utility/service-result';
import { BankAccount } from '../model/bank-account-model';

export interface BankAccountRepository {
    create(bankAccount: BankAccount): ServiceResult<BankAccount>;
    read(id: string): ServiceResult<BankAccount>;
    update(id: string, bankAccount: BankAccount): ServiceResult<BankAccount>;
}
```

To implement such interface, we can choose different storage and database technologies. For the simplicity of this guide, we will use an in-memory data structure, `Map<string, BankAccount>`.

Also, we are exporting another interface, `UpdateBankAccountProps` as update contract. For the integrity of bank accounts, we will only allow customers to update their account name and welcome message. This concern is going to be implemented

Place following implementation in `bank-account-repository.ts`:

```typescript
class BankAccountRepositoryImpl implements BankAccountRepository {
    private readonly dataStore = new Map<string, BankAccount>();

    public create(bankAccount: BankAccount): ServiceResult<BankAccount> {
        console.log('Creating Bank Account', bankAccount);

        throw new Error('Method not implemented.');
    }
    public read(id: string): ServiceResult<BankAccount> {
        console.log('Reading Bank Account', id);

        throw new Error('Method not implemented.');
    }
    public update(id: string, bankAccount: BankAccount): ServiceResult<BankAccount> {
        console.log('Updating Bank Account', id, bankAccount);

        throw new Error('Method not implemented.');
    }
}
```

As you can see above, we are just implementing `BankAccountRepository` but not exporting it. Exporting in NodeJS terminology means making your available outside as a module.

To export the interface, `BankAccountRepository` as contract, and to avoid exporting the concrete implementation, we can add following to the `bank-account-repository.ts`:

```typescript
const bankAccountRepository: BankAccountRepository = new BankAccountRepositoryImpl();
export default bankAccountRepository;
```

The above code will export the implementation as `BankAccountRepository` and all consumers will rely on the contract (abstraction over concrete implementation). When we want to move the `BankAccountRepositoryImpl` to another storage engine, the other parts of the application will not be affected with that change.

To use this abstraction anywhere else in the application, we will just need to import it using:

```typescript
import bankAccountRepository from '../../src/bank-account/repository/bank-account-repository';
```

Let's create our test cases for our BankAccount operations.

Place following implementation in `bank-account-repository.test.ts` under `app/test/bank-account` folder:

```typescript
import { randomUUID } from 'crypto';
import { BankAccount, CreateBankAccountProps, UpdateBankAccountProps } from '../../src/bank-account/model/bank-account-model';
import bankAccountRepository from '../../src/bank-account/repository/bank-account-repository';

describe('Bank Account Repository', () => {
    let bankAccount: BankAccount | undefined;

    beforeEach(() => {
        const owner = randomUUID();
        const accountName = 'Test Account';

        const props: CreateBankAccountProps = {
            name: accountName,
            owner,
        };

        const createBankAccount = BankAccount.create(props);
        bankAccount = createBankAccount.content!;
    });

    afterEach(() => {
        bankAccount = undefined;
    });

    test('Should Create Bank Account', () => {
        // Act
        const result = bankAccountRepository.create(bankAccount!);

        // Assert
        expect(result.content).not.toBeNull();
        expect(result.content?.id).not.toBeNull();
        expect(result.content?.name).toBe(bankAccount?.name);
        expect(result.content?.owner).toBe(bankAccount?.owner);
        expect(result.content?.accountNumber).not.toBeNull();
        expect(result.content?.sortCode).not.toBeNull();
        expect(result.content?.balance).toBe(0);
        expect(result.content?.welcomeMessage).toBeUndefined();
        expect(result.error).toBeUndefined();
    });

    test('Should Read Bank Account', () => {
        // Arrange
        const createBankAccount = bankAccountRepository.create(bankAccount!);
        const bankAccountId = createBankAccount.content!.id;

        // Act
        const result = bankAccountRepository.read(bankAccountId);

        // Assert
        expect(result.content).not.toBeNull();
        expect(result.content?.id).not.toBeNull();
        expect(result.content?.name).toBe(bankAccount?.name);
        expect(result.content?.owner).toBe(bankAccount?.owner);
        expect(result.content?.accountNumber).not.toBeNull();
        expect(result.content?.sortCode).not.toBeNull();
        expect(result.content?.balance).toBe(0);
        expect(result.content?.welcomeMessage).toBeUndefined();
        expect(result.error).toBeUndefined();
    });

    test('Should Update Bank Account', () => {
        // Arrange
        const createBankAccount = bankAccountRepository.create(bankAccount!);
        const bankAccountId = createBankAccount.content!.id;

        const updateProps: UpdateBankAccountProps = {
            name: 'Updated Account Name',
            welcomeMessage: 'Welcome to your account updated',
        };

        const updatedBankAccount = BankAccount.update(bankAccount!, updateProps);

        // Act
        const result = bankAccountRepository.update(bankAccountId, updatedBankAccount.content!);

        // Assert
        expect(result.content).not.toBeNull();
        expect(result.content?.id).not.toBeNull();
        expect(result.content?.name).toBe(updateProps.name);
        expect(result.content?.owner).toBe(bankAccount?.owner);
        expect(result.content?.accountNumber).not.toBeNull();
        expect(result.content?.sortCode).not.toBeNull();
        expect(result.content?.balance).toBe(0);
        expect(result.content?.welcomeMessage).toBe(updateProps.welcomeMessage);
        expect(result.error).toBeUndefined();
    });
});
```

At this point, we have completed:

1. Designing contract of our repository
2. Written unit test for repository using the contracts

Running tests using `npm run test` or via NPM Scripts on the UI will give following test failures:

```sh
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |    91.3 |      100 |   84.61 |    91.3 |                   
 src                         |     100 |      100 |     100 |     100 |                   
  index.ts                   |     100 |      100 |     100 |     100 |                   
 src/bank-account/model      |     100 |      100 |     100 |     100 |                   
  bank-account-model.ts      |     100 |      100 |     100 |     100 |                   
 src/bank-account/repository |   55.55 |      100 |      50 |   55.55 |                   
  bank-account-repository.ts |   55.55 |      100 |      50 |   55.55 | 19-26             
 src/utility                 |     100 |      100 |     100 |     100 |                   
  service-result.ts          |     100 |      100 |     100 |     100 |                   
-----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 2 passed, 3 total
Tests:       3 failed, 6 passed, 9 total
Snapshots:   0 total
Time:        2.147 s
Ran all test suites.
```

## ✅ Checkpoint: Let's Implement Repository

Let's implement the business logic and see all tests passing. Replace `BankAccountRepositoryImpl` with following:

```typescript
class BankAccountRepositoryImpl implements BankAccountRepository {
    private readonly dataStore = new Map<string, BankAccount>();

    public create(bankAccount: BankAccount): ServiceResult<BankAccount> {
        console.log('Creating Bank Account', bankAccount);

        try {
            this.dataStore.set(bankAccount.id, bankAccount);

            return ServiceResult.Succeeded(bankAccount);
        } catch (e) {
            console.log('Error creating bank account', e);

            return ServiceResult.Failed({
                errorMessage: 'Error creating bank account',
                errorType: 'ErrorCreatingBankAccount',
                details: e,
            });
        }
    }
    public read(id: string): ServiceResult<BankAccount> {
        console.log('Reading Bank Account', id);

        try {
            const bankAccount = this.dataStore.get(id);

            if (!bankAccount) {
                return ServiceResult.Failed({
                    errorMessage: 'Bank account not found',
                    errorType: 'BankAccountNotFound',
                });
            }

            return ServiceResult.Succeeded(bankAccount);
        } catch (e) {
            console.log('Error reading bank account', e);

            return ServiceResult.Failed({
                errorMessage: 'Error reading bank account',
                errorType: 'ErrorReadingBankAccount',
                details: e,
            });
        }
    }
    public update(id: string, updatedBankAccount: BankAccount): ServiceResult<BankAccount> {
        console.log('Updating Bank Account', id, updatedBankAccount);

        try {
            const bankAccount = this.dataStore.get(id);

            if (!bankAccount) {
                return ServiceResult.Failed({
                    errorMessage: 'Bank account not found',
                    errorType: 'BankAccountNotFound',
                });
            }

            this.dataStore.set(id, updatedBankAccount);

            return ServiceResult.Succeeded(updatedBankAccount);
        } catch (e) {
            console.log('Error updating bank account', e);

            return ServiceResult.Failed({
                errorMessage: 'Error updating bank account',
                errorType: 'ErrorUpdatingBankAccount',
                details: e,
            });
        }
    }
}
```

🎉 Running tests using `npm run test` or via NPM Scripts on the UI will give following test result:

```typescript
-----------------------------|---------|----------|---------|---------|---------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s   
-----------------------------|---------|----------|---------|---------|---------------------
All files                    |    87.5 |     87.5 |     100 |    87.5 |                     
 src                         |     100 |      100 |     100 |     100 |                     
  index.ts                   |     100 |      100 |     100 |     100 |                     
 src/bank-account/model      |     100 |      100 |     100 |     100 |                     
  bank-account-model.ts      |     100 |      100 |     100 |     100 |                     
 src/bank-account/repository |   70.37 |        0 |     100 |   70.37 |                     
  bank-account-repository.ts |   70.37 |        0 |     100 |   70.37 | ...7,45-47,61,71-73 
 src/utility                 |     100 |      100 |     100 |     100 |                     
  service-result.ts          |     100 |      100 |     100 |     100 |                     
-----------------------------|---------|----------|---------|---------|---------------------

Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.742 s, estimated 2 s
Ran all test suites.
```

Final view of the codebase should look like this:

![Repository Implementation](images/repository-implementation.png)