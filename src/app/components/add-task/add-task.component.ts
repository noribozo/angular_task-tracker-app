import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import {Task} from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  text: string = "";
  day: string = "";
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService:UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => (this.showAddTask = value));
   }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.text){
      alert('Please enter a new task!')
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder 
      }
      // emit event
      this.onAddTask.emit(newTask);
      
      this.text = "";
      this.day = "";
      this.reminder = false;
  }

}
