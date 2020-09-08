import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './transfer.reducer';

export const transferSliceState =
    createFeatureSelector<fromReducer.TransferState>(fromReducer.SLICE_ID_TRANSFER);

export const transferResponseState = createSelector(
    transferSliceState,
    (state) => state && state.transferList
);

export const transferSentState = createSelector(
    transferSliceState,
    (state) => state && state.transferSent
);

export const transactionResponseState = createSelector(
    transferSliceState,
    (state) => state && state.transactionList
);
