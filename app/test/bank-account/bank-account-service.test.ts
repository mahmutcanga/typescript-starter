import { randomUUID } from 'crypto';
import bankAccountService from '../../src/bank-account';
import { BankAccount, CreateBankAccountProps } from '../../src/bank-account/model/bank-account-model';
import bankAccountRepository from '../../src/bank-account/repository/bank-account-repository';

describe('Bank Account Service', () => {
    let createSpy: jest.SpyInstance;
    let updateSpy: jest.SpyInstance;
    let readSpy: jest.SpyInstance;

    beforeEach(() => {
        createSpy = jest.spyOn(bankAccountRepository, 'create');
        updateSpy = jest.spyOn(bankAccountRepository, 'update');
        readSpy = jest.spyOn(bankAccountRepository, 'read');
    });

    afterEach(() => {
        createSpy.mockRestore();
        updateSpy.mockRestore();
        readSpy.mockRestore();
    });

    test('Should Create', () => {
        // Arrange
        const owner = randomUUID();
        const accountName = 'Test Account';

        const props: CreateBankAccountProps = {
            name: accountName,
            owner,
        };

        const createExpectedBankAccount = BankAccount.create(props);

        createSpy.mockReturnValue(createExpectedBankAccount);

        // Act
        const createBankAccount = bankAccountService.create(props);
        const bankAccount = createBankAccount.content!;

        // Assert
        expect(bankAccount).not.toBeNull();
        expect(bankAccount?.balance).toBe(0);
        expect(bankAccount?.owner).toBe(createExpectedBankAccount.content!.owner);
        expect(bankAccount?.accountNumber).toBe(createExpectedBankAccount.content!.accountNumber);
        expect(bankAccount?.sortCode).toBe(createExpectedBankAccount.content!.sortCode);
        expect(bankAccount?.name).toBe(accountName);
        expect(bankAccount?.welcomeMessage).toBe(createExpectedBankAccount.content?.welcomeMessage);
        expect(bankAccount?.id).toBe(createExpectedBankAccount.content!.id);
        expect(bankAccount?.sortCode.length).toBe(6);
        expect(bankAccount?.accountNumber.length).toBe(8);
    });

    test('Should Update', () => {
        // Arrange
        const owner = randomUUID();
        const accountName = 'Test Account';

        const props: CreateBankAccountProps = {
            name: accountName,
            owner,
        };

        const createExpectedBankAccount = BankAccount.create(props);
        readSpy.mockReturnValue(createExpectedBankAccount);
        createSpy.mockReturnValue(createExpectedBankAccount);

        const createBankAccount = bankAccountService.create(props);

        const updateProps = {
            name: 'Updated Account Name',
        };

        const updatedExpectedBankAccount = BankAccount.update(createBankAccount.content!, updateProps);
        updateSpy.mockReturnValue(updatedExpectedBankAccount);

        // Act
        const bankAccount = bankAccountService.update(createBankAccount.content!.id, updateProps).content!;

        // Assert
        expect(bankAccount).not.toBeNull();
        expect(bankAccount?.balance).toBe(0);
        expect(bankAccount?.owner).toBe(createExpectedBankAccount.content!.owner);
        expect(bankAccount?.accountNumber).toBe(createExpectedBankAccount.content!.accountNumber);
        expect(bankAccount?.sortCode).toBe(createExpectedBankAccount.content!.sortCode);
        expect(bankAccount?.name).toBe(updateProps.name);
        expect(bankAccount?.welcomeMessage).toBe(createExpectedBankAccount.content?.welcomeMessage);
        expect(bankAccount?.id).toBe(createExpectedBankAccount.content!.id);
        expect(bankAccount?.sortCode.length).toBe(6);
        expect(bankAccount?.accountNumber.length).toBe(8);
    });
});
