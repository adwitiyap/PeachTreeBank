import { createAction, props } from '@ngrx/store';
import { Transaction } from 'src/app/models/transaction-model';

export const GetTransactionListRequest = createAction(
    '[GetTransactionListRequest] Get Transaction List Request'
);

export const GetTransactionListRequestSuccess = createAction(
    '[GetTransactionListRequest] Get Transaction List Request Success',
    props<{ response: Transaction[] }>()
);

export const GetTransactionListRequestError = createAction(
    '[GetTransactionListRequest] Get Transaction List Request Error',
);

export const RegisterTransaction = createAction(
    '[RegisterTransaction] Register Transaction Request',
    props<{ payload: Transaction }>()
);

