import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TodoTasksService } from 'src/app/Services/todoTasks.service';
import { TodoTasks } from 'src/app/model/TodoTasks';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


const ELEMENT_DATA: TodoTasks[] = [
  {position: 1, task: 'Fazer a cama', completed: false },
  {position: 2, task: 'Tomar café da manhã', completed: false },
  {position: 3, task: 'Escovar os dentes', completed: false },
  {position: 4, task: 'Tomar banho', completed: false },
  {position: 5, task: 'Arrumar a casa', completed: false },
  {position: 6, task: 'Fazer compras no mercado', completed: false },
  {position: 7, task: 'Pagar contas', completed: false },
  {position: 8, task: 'Trabalhar no projeto da faculdade', completed: false },
  {position: 9, task: 'Fazer exercícios físicos', completed: false },
  {position: 10, task: 'Ler um livro.', completed: false },
];
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [TodoTasksService]
})
export class TodoListComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'completed', 'action'];
  dataSource!: TodoTasks[];

  constructor(
    public dialog: MatDialog,
    public todoTasksService: TodoTasksService
    ) {
      this.todoTasksService.getElements()
       .subscribe((data: TodoTasks[]) => {
        this.dataSource =  data;
       });
    }

  openDialog(element: TodoTasks | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data:element === null ? {
        position: null,
        task: '',
        completed: false
      } : {
        position: element.position,
        task: element.task,
        completed: element.completed
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.position).includes(result.position)) {
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }

      }
    });
  }

  editElement(element: TodoTasks):void {
    this.openDialog(element);
  }

  deleteElement(position: number):void {
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }
}
export { TodoTasks };

