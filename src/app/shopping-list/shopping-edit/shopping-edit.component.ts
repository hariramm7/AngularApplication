import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slService.startedEditing.
    subscribe((index:number)=>{
      this.editedItemIndex=index;
    });
  }

  onAddItem(form:NgForm) {
    const value=form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    this.slService.addIngredient(newIngredient);
    form.reset();
  }

  onClear(){
    this.slForm.reset();
  }

  onDelete()
{
  this.slService.deleteIngredients(this.editedItemIndex)
  this.onClear();
}

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
