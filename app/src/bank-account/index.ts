import { ServiceResult } from '../utility/service-result';
import { BankAccount, CreateBankAccountProps, UpdateBankAccountProps } from './model/bank-account-model';
import bankAccountRepository, { BankAccountRepository } from './repository/bank-account-repository';

export interface BankAccountService {
    create(props: CreateBankAccountProps): ServiceResult<BankAccount>;
    read(id: string): ServiceResult<BankAccount>;
    update(id: string, props: UpdateBankAccountProps): ServiceResult<BankAccount>;
}

class BankAccountServiceImpl implements BankAccountService {
    private readonly repository: BankAccountRepository;

    constructor(repository: BankAccountRepository) {
        this.repository = repository;
    }

    public create(props: CreateBankAccountProps): ServiceResult<BankAccount> {
        console.log('Creating Bank Account', props);

        const createBankAccount = BankAccount.create(props);
        if (createBankAccount.failure) return createBankAccount;

        console.log('Saving Bank Account', createBankAccount.content);

        const result = this.repository.create(createBankAccount.content!);
        return result;
    }

    public read(id: string): ServiceResult<BankAccount> {
        console.log('Reading Bank Account', id);

        const result = this.repository.read(id);
        return result;
    }

    public update(id: string, props: UpdateBankAccountProps): ServiceResult<BankAccount> {
        console.log('Updating Bank Account', id, props);

        const readBankAccount = this.repository.read(id);
        if (readBankAccount.failure) return readBankAccount;

        const updateBankAccount = BankAccount.update(readBankAccount.content!, props);
        if (updateBankAccount.failure) return updateBankAccount;

        console.log('Saving Bank Account', updateBankAccount.content);
        const result = this.repository.update(id, updateBankAccount.content!);
        return result;
    }
}

const bankAccountService: BankAccountService = new BankAccountServiceImpl(bankAccountRepository);
export default bankAccountService;
