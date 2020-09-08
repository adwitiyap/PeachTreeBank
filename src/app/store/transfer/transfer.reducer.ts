import { createReducer, on, Action, State } from '@ngrx/store';

import * as fromTransferActions from './transfer.actions';
import * as fromTransactionActions from './transaction.actions';
import { Transfer } from 'src/app/models/transfer-model';
import { Transaction } from 'src/app/models/transaction-model';

export const SLICE_ID_TRANSFER = 'transfer';

export interface TransferState {
    transferSent: boolean,
    transactionListReceived: boolean,
    transferList: Transfer[],
    transactionList: Transaction[]
}

export const initialState = {
    transferSent: false,
    transactionListReceived: false,
    transferList: [],
    transactionList: []
};

export const TransferReducer = createReducer(
    initialState,
    on(fromTransferActions.MakeTransferRequest,
        (state) => ({ ...state, transferSent: false })
    ),
    on(fromTransferActions.MakeTransferRequestSuccess,
        (state, { response }) => ({
            ...state,
            transferSent: true,
            transferList: [...state.transferList, response]
        })
    ),
    on(fromTransferActions.MakeTransferRequestError,
        (state) => ({ ...state, transferSent: false })
    ),

    on(fromTransactionActions.GetTransactionListRequest,
        (state) => ({ ...state, transactionListReceived: false })
    ),
    on(fromTransactionActions.GetTransactionListRequestSuccess,
        (state, { response }) => ({
            ...state,
            transactionListReceived: true,
            transactionList: response
        })
    ),
    on(fromTransactionActions.GetTransactionListRequestError,
        (state) => ({ ...state, transactionListReceived: false })
    ),
    on(fromTransactionActions.RegisterTransaction,
        (state, payload) => ({
            ...state,
            transactionList: [payload.payload, ...state.transactionList]
        })
    )
);

export function reducer(state: TransferState, action: Action) {
    return TransferReducer(state, action);
}
