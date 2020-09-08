import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromTransferActions from '../../store/transfer/transfer.actions';
import * as fromTransactionActions from '../../store/transfer/transaction.actions';

@Component({
    selector: 'pb-make-transfer-container',
    templateUrl: './make-transfer.container.component.html',
    styleUrls: ['./make-transfer.container.component.scss']
})
export class MakeTransferContainerComponent {

    constructor(private readonly store: Store<any>) { }

    sendTransfer(transfer) {
        this.store.dispatch(fromTransferActions.MakeTransferRequest(
            { payload: transfer }
        ));

        this.store.dispatch(fromTransactionActions.RegisterTransaction(
            {
                payload: {
                    amount: transfer.amount,
                    categoryCode: '#223332',
                    merchant: transfer.toAccount,
                    merchantLogo: '',
                    transactionDate: Date(),
                    transactionType: 'Online Payment'
                }
            }
        ))
    }
}
