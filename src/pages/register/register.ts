import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Response } from '@angular/http';
import { LoginPage } from '../login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 // registerCredentials = { email: '', password: '' };
 registerval = {};
 email:any;
 password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register(){

   const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const obj = this.registerval;
    //const body = 'data=' + JSON.stringify(obj);
    const body = 'data=' + JSON.stringify(obj);
    this.http.post('http://php.worklab.in/myApp_api/testApp/registeruser.php/', body, { headers })
    .subscribe(res =>{
    
    if(res.json().insert)
    {
     this.navCtrl.push(LoginPage);
    }

     // alert(JSON.stringify(res.json()));
      }
      , res => console.error(res)) 

  }

}
