import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TodoTasks } from 'src/app/components/todo-list/todo-list.component';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent {
  element!: TodoTasks;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: TodoTasks,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void{
    if (this.data.position != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
