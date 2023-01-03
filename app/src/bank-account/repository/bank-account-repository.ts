import { ServiceResult } from '../../utility/service-result';
import { BankAccount } from '../model/bank-account-model';

export interface BankAccountRepository {
    create(bankAccount: BankAccount): ServiceResult<BankAccount>;
    read(id: string): ServiceResult<BankAccount>;
    update(id: string, bankAccount: BankAccount): ServiceResult<BankAccount>;
}

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

const bankAccountRepository: BankAccountRepository = new BankAccountRepositoryImpl();
export default bankAccountRepository;
