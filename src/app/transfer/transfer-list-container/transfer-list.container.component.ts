import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTransferActions from '../../store/transfer/transfer.actions';
import * as fromTransactionActions from '../../store/transfer/transaction.actions';
import { transactionResponseState } from 'src/app/store/transfer/transfer.selectors';
import { Transaction } from 'src/app/models/transaction-model';


@Component({
    selector: 'pb-transfer-list-container',
    templateUrl: './transfer-list.container.component.html',
    styleUrls: ['./transfer-list.container.component.scss']
})
export class TransferListContainerComponent implements OnInit {
    transactionList$: Observable<Transaction[]>;
    transactionList: Transaction[];

    constructor(private readonly store: Store<any>) { }

    ngOnInit() {
        this.store.dispatch(fromTransactionActions.GetTransactionListRequest());
        this.transactionList$ = this.store.pipe(
            select(transactionResponseState)
        );
    }

    sendTransfer(transfer) {
        this.store.dispatch(fromTransferActions.MakeTransferRequest(
            { payload: transfer })
        );
    }
}
