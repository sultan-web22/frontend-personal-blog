// src/app/features/home/writing-area/writing-area.component.ts
import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
// import { AuthService } from '../../../core/services/auth.service';
import { ISlide,IPost } from '../../core/models/IPost';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-writing-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './writingarea.html',
  styleUrl: './writingarea.css'
})
export class WritingAreaComponent implements OnInit {
//   private authService = inject(AuthService);
private readonly storagekey ='storagekey';

  selectedCategory = '';
  postTitle = '';
  noteText = '';
slides: ISlide[] = [{content:''}]
  constructor(private http:HttpClient) {
    /**
     * This effect automatically runs whenever the authenticated user changes.
     * It reads the categories signal, updates your template, and pre-selects the first option.
     */
    effect(() => {
      const user = this.authService.currentUser();
      const categories = user ? user.categories : [];

      if (categories.length > 0 && !this.selectedCategory) {
        this.selectedCategory = categories[0];
      }
    });
  }
  ngOnInit() {
    this.loadDraftFromStorage();
  }
  savetolocalstorage(){
    const data ={
      title:this.postTitle,
      slide:this.slides
    };
    localStorage.setItem(this.storagekey,JSON.stringify(data))
  }

  // Helper method to let your template read the live categories array securely
  get categories(): string[] {
    const user = this.authService.currentUser();
    return user ? user.categories : [];
  }
   addSlide() {
    this.slides.push({
     content: ''
    });
    this.savetolocalstorage();
  }
loadDraftFromStorage(){
const Rawdata = localStorage.getItem(this.storagekey);
if(Rawdata){
  try{
const parseddata=JSON.parse(Rawdata)
this.postTitle=parseddata.title || ''
this.slides=parseddata.slide || []
  }catch(error){
console.log('Could not parse local draft data:', error)
  }
}
}
submitpost(){
const finalpost={
  title:this.postTitle,
  slides:this.slides
}
this.http.post(`${Environment.apiURL}/post`,finalpost).subscribe({next:(Response)=>{
  localStorage.removeItem(this.storagekey);
            this.postTitle = '';
          this.slides = [{content:''}]
},error:(err)=>{
  console.error('failed to submit data')
}
})




}}
