import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction-model';

@Component({
    selector: 'pb-transfer-list',
    templateUrl: './transfer-list.component.html',
    styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnInit, OnChanges {
    @Input()
    transactionList: Transaction[];
    filteredTransactionList: Transaction[];
    lastSortKey: string;
    isDescOrder: boolean;

    transferListForm: FormGroup;
    @Output() sendTransfer: EventEmitter<string> = new EventEmitter();

    ngOnInit() {
        this.transactionList = this.transactionList;
        this.filteredTransactionList = this.transactionList;

        this.transferListForm = new FormGroup({
            searchKey: new FormControl('', { validators: [Validators.required] })
        });
    }

    ngOnChanges() {
        this.filteredTransactionList = this.transactionList;
    }

    searchData() {
        this.filteredTransactionList = this.transactionList.filter(
            tr => {
                if (tr) {
                    return tr.merchant.toUpperCase().includes(
                        this.transferListForm.controls.searchKey.value.toUpperCase());
                } else {
                    return false;
                }
            });
    }

    onSearchKeyClear() {
        this.transferListForm.controls.searchKey.setValue('');
        this.searchData();
    }

    sort(key) {

        if (this.lastSortKey === key) {
            this.isDescOrder = !this.isDescOrder;
        }

        switch (key) {
            case 'byAmount':
                this.filteredTransactionList.sort((a, b) => {
                    if (this.isDescOrder) {
                        return parseFloat(b.amount.toString()) - parseFloat(a.amount.toString());
                    } else {
                        return parseFloat(a.amount.toString()) - parseFloat(b.amount.toString());
                    }
                });
                break;

            case 'byDate':
                this.filteredTransactionList.sort((a, b) => {
                    if (this.isDescOrder) {
                        return parseFloat(b.transactionDate.toString()) - parseFloat(a.transactionDate.toString());
                    } else {
                        return parseFloat(a.transactionDate.toString()) - parseFloat(b.transactionDate.toString());
                    }
                });
                break;

            case 'byBeneficiary':
                this.filteredTransactionList.sort((a, b) => {
                    if (this.isDescOrder) {
                        return a.merchant == b.merchant ? 0 : +(a.merchant < b.merchant) || -1;
                    } else {
                        return (a.merchant == b.merchant) ? 0 : +(a.merchant > b.merchant) || -1;
                    }
                });
                break;
        }

        this.lastSortKey = key;
    }
}
