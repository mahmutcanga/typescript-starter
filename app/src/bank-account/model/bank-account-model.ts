import { randomUUID } from 'crypto';
import { ServiceResult } from '../../utility/service-result';

export interface BankAccountProps {
    id: string;
    name: string;
    balance: number;
    owner: string;
    sortCode: string;
    accountNumber: string;
    welcomeMessage?: string;
}

export interface CreateBankAccountProps {
    name: string;
    owner: string;
}

export interface UpdateBankAccountProps {
    name?: string;
    welcomeMessage?: string;
}

export class BankAccount implements BankAccountProps {
    public readonly id: string;
    public readonly name: string;
    public readonly balance: number;
    public readonly owner: string;
    public readonly sortCode: string;
    public readonly accountNumber: string;
    public readonly welcomeMessage?: string;

    private constructor(props: BankAccountProps) {
        this.id = props.id;
        this.name = props.name;
        this.balance = props.balance;
        this.owner = props.owner;
        this.sortCode = props.sortCode;
        this.accountNumber = props.accountNumber;
        this.welcomeMessage = props.welcomeMessage;
    }

    public static create(props: CreateBankAccountProps): ServiceResult<BankAccount> {
        console.log('Creating Bank Account', props);

        if (!props.name) {
            return ServiceResult.Failed({
                errorMessage: 'Account name cannot be empty or null',
                errorType: 'InvalidAccountName',
            });
        }

        if (!props.owner) {
            return ServiceResult.Failed({
                errorMessage: 'Account owner cannot be empty or null',
                errorType: 'InvalidAccountOwner',
            });
        }

        const bankAccount = new BankAccount({
            id: randomUUID(),
            name: props.name,
            balance: 0,
            owner: props.owner,
            sortCode: BankAccount.generateSortCode(),
            accountNumber: BankAccount.generateAccountNumber(),
        });

        return ServiceResult.Succeeded(bankAccount);
    }

    private static generateSortCode(): string {
        const sortCode = Math.floor(100_000 + Math.random() * 900_000).toString();
        console.log('Generated Sort Code', sortCode);
        return sortCode;
    }

    private static generateAccountNumber(): string {
        const accountNumber = Math.floor(1_000_0000 + Math.random() * 90_000_000).toString();
        console.log('Generated Account Number', accountNumber);
        return accountNumber;
    }

    public static update(bankAccount: BankAccount, props: UpdateBankAccountProps): ServiceResult<BankAccount> {
        console.log('Updating Bank Account', bankAccount, props);

        const updatedBankAccount = new BankAccount({
            id: bankAccount.id,
            name: props.name ?? bankAccount.name,
            balance: bankAccount.balance,
            owner: bankAccount.owner,
            sortCode: bankAccount.sortCode,
            accountNumber: bankAccount.accountNumber,
            welcomeMessage: props.welcomeMessage ?? bankAccount.welcomeMessage,
        });

        return ServiceResult.Succeeded(updatedBankAccount);
    }
}
