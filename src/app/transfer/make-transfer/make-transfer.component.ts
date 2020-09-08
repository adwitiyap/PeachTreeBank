import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transfer } from 'src/app/models/transfer-model';

@Component({
    selector: 'pb-make-transfer',
    templateUrl: './make-transfer.component.html',
    styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit {

    transferForm: FormGroup;
    submitted = false;
    isPreviewMode = false;

    @Output() sendTransfer: EventEmitter<Transfer> = new EventEmitter();

    fromText = 'Free Checking(4692) - $';
    fromAmount = 5824.76;

    ngOnInit() {
        this.transferForm = new FormGroup({
            fromAccount: new FormControl({ value: this.fromText + this.fromAmount, disabled: true }, { validators: [Validators.required] }),
            toAccount: new FormControl('', { validators: [Validators.required] }),
            amount: new FormControl('', { validators: [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')] })
        });
    }

    get f() { return this.transferForm.controls; }

    onTransferClick() {
        this.sendTransfer.emit({
            fromAccount: this.transferForm.controls.fromAccount.value,
            toAccount: this.transferForm.controls.toAccount.value,
            amount: this.transferForm.controls.amount.value
        });

        this.reset();
    }

    onSubmitClick() {
        this.submitted = true;

        if (this.transferForm.invalid) {
            return;
        }

        this.isPreviewMode = true;
    }

    onBackClick() {
        this.isPreviewMode = false;
    }

    reset() {
        this.submitted = false;
        this.isPreviewMode = false;

        this.fromAmount = this.fromAmount - parseFloat(this.transferForm.controls.amount.value);
        this.transferForm.controls.fromAccount.setValue(this.fromText + this.fromAmount);
        this.transferForm.controls.toAccount.setValue('');
        this.transferForm.controls.amount.setValue('');
    }
}
