import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';



/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  public base64Image: string;
  imagedata:any = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera, 
    private sqlite: SQLite,
    public alertCtrl: AlertController,
    private toast: Toast) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
    this.getImageData();
  }

  public getImageData()
  {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM Imagedata', [])
      .then(res => {
        console.log(res);
        this.imagedata = [];
        for(var i=0; i<res.rows.length; i++) {
          this.imagedata.push({id:res.rows.item(i).id,imagedata:res.rows.item(i).imageName})
        }
        
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 500,
        targetHeight: 500
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        /******* For Insert Query *******/
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO Imagedata (imageName) VALUES(?)', [this.base64Image])
          .then(res => {
           // console.log(res);
            this.getImageData();
            
          })
          .catch(e => console.log(e));
        }).catch(e => console.log(e));
      /******* Code End Insert *******/
    }, (err) => {
        console.log(err);
    });
  }

  public deleteImage(id)
  {
    
    
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to delete this image?',
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
              db.executeSql('DELETE FROM Imagedata WHERE id =(?)', [id])
              .then(res => {
                console.log(res);
                this.toast.show('Image deleted successfully', '5000', 'center').subscribe(
                  toast => {
                    this.getImageData();
                  }
                );
                
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
