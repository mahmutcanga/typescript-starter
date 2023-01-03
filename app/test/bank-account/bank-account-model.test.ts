import { randomUUID } from 'crypto';
import { BankAccount, CreateBankAccountProps, UpdateBankAccountProps } from '../../src/bank-account/model/bank-account-model';

describe('Bank Account Model', () => {
    test('Should Create', () => {
        // Arrange
        const owner = randomUUID();
        const accountName = 'Test Account';

        const props: CreateBankAccountProps = {
            name: accountName,
            owner,
        };

        // Act
        const createBankAccount = BankAccount.create(props);
        const bankAccount = createBankAccount.content;

        // Assert
        expect(bankAccount).not.toBeNull();
        expect(bankAccount?.balance).toBe(0);
        expect(bankAccount?.owner).toBe(owner);
        expect(bankAccount?.accountNumber).not.toBeNull();
        expect(bankAccount?.sortCode).not.toBeNull();
        expect(bankAccount?.name).toBe(accountName);
        expect(bankAccount?.welcomeMessage).toBeUndefined();
        expect(bankAccount?.id).not.toBeNull();
        expect(bankAccount?.sortCode.length).toBe(6);
        expect(bankAccount?.accountNumber.length).toBe(8);
    });

    test('Should Fail To Create With Empty Account Name', () => {
        // Arrange
        const owner = randomUUID();
        const accountName = null;

        const props: CreateBankAccountProps = {
            // @ts-ignore
            name: accountName,
            owner,
        };

        // Act
        const createBankAccount = BankAccount.create(props);

        // Assert
        expect(createBankAccount.content).toBeNull();
        expect(createBankAccount.error).not.toBeNull();
        expect(createBankAccount.error?.errorType).toBe('InvalidAccountName');
        expect(createBankAccount.error?.errorMessage).toBe('Account name cannot be empty or null');
    });

    test('Should Fail To Create With Empty Account Owner', () => {
        // Arrange
        const owner = null;
        const accountName = 'Test Account';

        const props: CreateBankAccountProps = {
            name: accountName,
            // @ts-ignore
            owner,
        };

        // Act
        const createBankAccount = BankAccount.create(props);

        // Assert
        expect(createBankAccount.content).toBeNull();
        expect(createBankAccount.error).not.toBeNull();
        expect(createBankAccount.error?.errorType).toBe('InvalidAccountOwner');
        expect(createBankAccount.error?.errorMessage).toBe('Account owner cannot be empty or null');
    });

    test('Should Update Bank Account Name', () => {
        // Arrange
        const owner = randomUUID();
        const accountName = 'Test Account';

        const props: CreateBankAccountProps = {
            name: accountName,
            owner,
        };

        const createBankAccount = BankAccount.create(props);
        const bankAccount = createBankAccount.content!;

        const newAccountProps: UpdateBankAccountProps = {
            name: 'New Account Name',
        };

        // Act
        const updateBankAccount = BankAccount.update(bankAccount, newAccountProps);

        // Assert
        expect(updateBankAccount.content).not.toBeNull();
        expect(updateBankAccount.content?.name).toBe(newAccountProps.name);
        expect(updateBankAccount.content?.welcomeMessage).toBeUndefined();
    });

    test('Should Update Bank Account Welcome Message', () => {
        // Arrange
        const owner = randomUUID();
        const accountName = 'Test Account';

        const props: CreateBankAccountProps = {
            name: accountName,
            owner,
        };

        const createBankAccount = BankAccount.create(props);
        const bankAccount = createBankAccount.content!;

        const newAccountProps: UpdateBankAccountProps = {
            welcomeMessage: 'Welcome to my account',
        };

        // Act
        const updateBankAccount = BankAccount.update(bankAccount, newAccountProps);

        // Assert
        expect(updateBankAccount.content).not.toBeNull();
        expect(updateBankAccount.content?.name).toBe(accountName);
        expect(updateBankAccount.content?.welcomeMessage).toBe(newAccountProps.welcomeMessage);
    });
});
