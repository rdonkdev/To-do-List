import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  task: string;
  position: number;
  completed: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, task: 'Hydrogen', completed: false },
  {position: 2, task: 'Helium', completed: false },
  {position: 3, task: 'Lithium', completed: false },
  {position: 4, task: 'Beryllium', completed: false },
  {position: 5, task: 'Boron', completed: false },
  {position: 6, task: 'Carbon', completed: false },
  {position: 7, task: 'Nitrogen', completed: false },
  {position: 8, task: 'Oxygen', completed: false },
  {position: 9, task: 'Fluorine', completed: false },
  {position: 10, task: 'Neon', completed: false },
];
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'completed', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data:element === null ? {
        position: null,
        task: '',
        completed: false
      } : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dataSource.push(result);
        this.table.renderRows();
      }
    });
  }

  editElement(element: PeriodicElement):void {
    this.openDialog(element);
  }

  deleteElement(position: number):void {
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }
}
