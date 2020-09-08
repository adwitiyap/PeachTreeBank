import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from '../../services/api-service';
import * as fromTransferActions from './transfer.actions';
import * as fromTransactionActions from './transaction.actions';

@Injectable()
export class TransferEffects {

    MakeTransferEffect$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(fromTransferActions.MakeTransferRequest),
                switchMap(action => {
                    return this.apiService.makeTransfer(action.payload)
                        .pipe(
                            map((response: any) => {
                                return (fromTransferActions.MakeTransferRequestSuccess({ response }));
                            }),
                            catchError(() => {
                                return of(fromTransferActions.MakeTransferRequestError());
                            })
                        );
                })
            )
    );

    GetTransactionListEffect$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(fromTransactionActions.GetTransactionListRequest),
                switchMap(action => {
                    return this.apiService.getTransactionList()
                        .pipe(
                            map((response: any) => {
                                return (fromTransactionActions.GetTransactionListRequestSuccess({ response }));
                            }),
                            catchError(() => {
                                return of(fromTransactionActions.GetTransactionListRequestError());
                            })
                        );
                })
            )
    );

    constructor(
        private store: Store<any>,
        private actions$: Actions,
        private apiService: ApiService
    ) { }
}
