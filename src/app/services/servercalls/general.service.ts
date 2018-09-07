import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  'rxjs/add/operator/map';
import { SearchTutorModel } from '../../models/SearchTutorModel';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
<<<<<<< HEAD
import { BehaviorSubject } from '../../../../node_modules/rxjs';
=======
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7

@Injectable()
export class GeneralService {
  baseUrl = environment.baseUrl;
<<<<<<< HEAD
  post_id = new BehaviorSubject<any>('');
  post_idObv: Observable<any>;
  constructor(
    public http:HttpClient,
   ) {
    this.post_idObv = this.post_id.asObservable();
=======

  constructor(
    public http:HttpClient,
   ) {
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
  }

  // Find Tutor
  indexTutors(searchValue){
    return this.http.get(this.baseUrl+'/findtutors?'+'subject='+searchValue[0]+'&location='+searchValue[1]);
  }

  showTutor(id:string){
    return this.http.get(this.baseUrl+'/findtutors/'+id);
  }

  // Posts
<<<<<<< HEAD
  sendPostId(val: string): void {
    this.post_id.next(val);
  }
  getPostId() {
    return this.post_idObv;
  }

  displayAllPosts(){
    return this.http.get(this.baseUrl+'/posts');
  }

=======
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
  indexAllPosts(type, subject, grade){
    return this.http.get(this.baseUrl+'/posts/'+'?type='+type+'&'+'subject='+subject+'&grade='+grade);
  }

  showPost(id:string){
    return this.http.get(this.baseUrl+'/posts/'+id);
  }
<<<<<<< HEAD
  
  displayPostPages(page: number){
    return this.http.get(this.baseUrl+'/posts?page='+page);
  }
=======
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7

  indexDiscussions(){

  }
  
  showDiscussions(){

  }

  // Contact us forms
  storeContact(contactUs){
    return this.http.post(this.baseUrl+'/contacts', contactUs);
  }
}