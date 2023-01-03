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
    });
});
