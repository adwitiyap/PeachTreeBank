import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transfer } from 'src/app/models/transfer-model';
import { Transaction } from 'src/app/models/transaction-model';

@Component({
    selector: 'pb-transfer-item',
    templateUrl: './transfer-item.component.html',
    styleUrls: ['./transfer-item.component.scss']
})
export class TransferItemComponent {

    @Input()
    transaction: Transaction;
}
