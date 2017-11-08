import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Http, Headers, Response } from '@angular/http';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import {Storage} from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  items:any = [];
  loginval = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private sqlite: SQLite,public http: Http,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('login').then((val) => {
      if(val)
      {
      this.navCtrl.push(HomePage);
      }
    });
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    
   const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const obj = this.loginval;
    //const body = 'data=' + JSON.stringify(obj);
    const body = 'data=' + JSON.stringify(obj);
    this.http.post('http://php.worklab.in/myApp_api/testApp/login.php/', body, { headers })
    .subscribe(res =>{
    console.log(res.json());
    if(res.json()[0].id)
    {
     this.storage.set('login',res.json()[0].uemail); 
     this.navCtrl.push(HomePage);
    } 

     // alert(JSON.stringify(res.json()));
      }
      , res => console.error(res)) 
  }


}
