import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, NavParams, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { CameraPage } from '../camera/camera';
import { GraphPage } from '../graph/graph';
import { GooglemapPage } from '../googlemap/googlemap';
import { UsersPage } from '../users/users';


import {Camera} from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
import {Storage} from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;

  expenses: any = [];
  
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  url: string;
  
  public base64Image: string;
  public useremail;
 
  constructor(public navCtrl: NavController, public camera: Camera, private sqlite: SQLite, 
    public localNotifications: LocalNotifications,public platform: Platform, public alertCtrl: AlertController,
    private storage:Storage,public navParams: NavParams,private inAppBrowser: InAppBrowser, private viewCtrl: ViewController) {
             
            //this.useremail = this.navParams.get("firstPassed");
      
            this.notifyTime = moment(new Date()).format();
             this.chosenHours = new Date().getHours();
             this.chosenMinutes = new Date().getMinutes();
      
             this.days = [
                 {title: 'Monday', dayCode: 1, checked: false},
                 {title: 'Tuesday', dayCode: 2, checked: false},
                 {title: 'Wednesday', dayCode: 3, checked: false},
                 {title: 'Thursday', dayCode: 4, checked: false},
                 {title: 'Friday', dayCode: 5, checked: false},
                 {title: 'Saturday', dayCode: 6, checked: false},
                 {title: 'Sunday', dayCode: 0, checked: false}
             ];

            
    }


    openWebpage(url: string) {
      const options: InAppBrowserOptions = {
        zoom: 'no'
      }
  
      // Opening a URL and returning an InAppBrowserObject
      const browser = this.inAppBrowser.create(url, '_self', options);
  
     // Inject scripts, css and more with browser.X
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.get('login').then((val) => {
      let namearr =  val.split("@");
      this.useremail = namearr[0];
    });
  }

  timeChange(time){
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
   }

    public logout(){
      this.storage.remove('login').then(()=>{
          this.navCtrl.push(LoginPage);
      });
    }
     

  
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.getData();
  }


  public openPage(page)
  {
    if(page == 'CameraPage')
    {
    this.navCtrl.push(CameraPage);
    }else if(page == 'GraphPage')
    {
    this.navCtrl.push(GraphPage);
    }else if(page == 'GooglemapPage')
    {
    this.navCtrl.push(GooglemapPage);
    }else if(page == 'UsersPage')
    {
    this.navCtrl.push(UsersPage);
    }

    
    
  }

 

  getData() {
    //db: SQLiteObject
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db :SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('CREATE TABLE IF NOT EXISTS Imagedata(id INTEGER PRIMARY KEY AUTOINCREMENT, imageName)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM expense ORDER BY rowid DESC', {})
      .then(res => {
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalIncome = parseInt(res.rows.item(0).totalIncome);
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalExpense = (res.rows.item(0).totalExpense) ? parseInt(res.rows.item(0).totalExpense) : 0;
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
    }).catch(e => console.log(e));
  }
  
  addData() {
    this.navCtrl.push(AboutPage);
  }
  
  editData(rowid) {
    this.navCtrl.push(ContactPage, {
      rowid:rowid
    });
  }
  
  deleteData(rowid) {
 
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ok',
          handler: () => {

            this.sqlite.create({
              name: 'ionicdb.db',
              location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
              .then(res => {
                console.log(res);
                this.getData();
              })
              .catch(e => console.log(e));
            }).catch(e => console.log(e));
          }
        }
      ]
    });
    alert.present();

  }


}


    //Code for graph 
    /*
   
              */

 
  /******** Code For Notification  ********/
       /*
       addNotifications(){
        let currentDate = new Date();
        let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
     
        for(let day of this.days){
            if(day.checked){
                let firstNotificationTime = new Date();
                let dayDifference = day.dayCode - currentDay;
                if(dayDifference < 0){
                    dayDifference = dayDifference + 7; // for cases where the day is in the following week
                }
     
                firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
                firstNotificationTime.setHours(this.chosenHours);
                firstNotificationTime.setMinutes(this.chosenMinutes);
     
                let notification = {
                    id: day.dayCode,
                    title: 'Hey!',
                    text: 'You just got notified :)',
                    at: firstNotificationTime,
                    every: 'week'
                };
     
                this.notifications.push(notification);
     
            }
     
        }
     
        console.log("Notifications to be scheduled: ", this.notifications);
     
        if(this.platform.is('cordova')){
     
            // Cancel any existing notifications
            this.localNotifications.cancelAll().then(() => {
     
                // Schedule the new notifications
                this.localNotifications.schedule(this.notifications);
     
                this.notifications = [];
     
                let alert = this.alertCtrl.create({
                    title: 'Notifications set',
                    buttons: ['Ok']
                });
     
                alert.present();
     
            });
     
        }
    
       }
    
       cancelAll(){
        this.localNotifications.cancelAll();
        
           let alert = this.alertCtrl.create({
               title: 'Notifications cancelled',
               buttons: ['Ok']
           });
        
           alert.present();
       } */