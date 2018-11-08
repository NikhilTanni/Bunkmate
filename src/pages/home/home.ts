import { Component, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('conducted_inp') myInput ;
  percent_mode:any=0;
  percent_radio:any=85;
  percent_radio_cus:any;
  conducted:any;
  present:any;
  mod_info=0;
  error={'conducted':'','present':''};
  result={'emotion':'input details to calculate attendance!!','att':'','msg':'--','icon':'md-happy','iconcolor':'primary'}
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private ga: GoogleAnalytics) {
    this.conducted="";
    this.present="";
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.myInput.setFocus();
    },500);
     this.init_ga();
  }

  init_ga(){
    this.ga.startTrackerWithId('UA-127384723-1')
     .then(() => {
       console.log('Google analytics is ready now');
        this.ga.trackView('Bunkmate_app_home');
       // Tracker is ready
       // You can now track pages or set additional information such as AppVersion or UserId
     })
     .catch(e => console.log('Error starting GoogleAnalytics', e));
  }


  check_valid_input(){
    if(this.conducted=="" || this.conducted<=0){
      this.result['emotion']="enter number of classes conducted";
      this.result['icon']="md-create";
      this.result['iconcolor']="warning";
      this.result['att']="";
      this.result['msg']="--";
    }
    else if(this.present=="" || this.present<0){
      this.result['emotion']="enter number of classes present";
      this.result['icon']="md-create";
      this.result['iconcolor']="warning";
      this.result['att']="";
      this.result['msg']="--";
    }
    else if(parseInt(this.conducted)<parseInt(this.present)){
      this.result['emotion']="Error! check if you have exchanged conducted classes with present classes!";
      this.result['icon']="md-swap";
      this.result['iconcolor']="warning";
      this.result['att']="";
      this.result['msg']="--";
    }
    else if(parseInt(this.conducted)>0 && parseInt(this.present)>0){
      this.result['emotion']="Calculating...";
      this.calculate_att();
    }
    else{
      this.calculate_att();
    }
  }


  calculate_att(){

    var att_per:any = parseInt(this.present)/parseInt(this.conducted);
    att_per=att_per*100;
    this.result['emotion']="--";

    var target_att:any = this.percent_radio;
    if(parseInt(target_att)>att_per){
      //how many claas to attend
      var x:any = ((parseInt(target_att)*parseInt(this.conducted) - 100*parseInt(this.present))/(100-parseInt(target_att)));
      // alert(x);
      if(isNaN(parseInt(x))){
        this.result['emotion']="Oops! you can't bunk now.";
        this.result['icon']="thumbs-down";
        this.result['iconcolor']="danger";
        this.result['att']="Your current attendance is "+att_per+"%";
        this.result['msg']="you can never make it to "+parseInt(target_att)+"%.";
      }
      else{
        this.result['emotion']="Oops! you can't bunk now.";
        this.result['icon']="thumbs-down";
        this.result['iconcolor']="danger";
        this.result['att']="Your current attendance is "+att_per+"%";
        if(parseFloat(x)%1>=0.1){
          x=x+1;
        }
        this.result['msg']="you need to attend "+parseInt(x)+" more classes to get attendance back to "+target_att+"%";
      }

    }
    else if(parseInt(target_att)<parseInt(att_per)){
      //how many can we bunk
      var x:any =(100*parseInt(this.present) - parseInt(target_att)*parseInt(this.conducted))/parseInt(target_att);
      this.result['emotion']="Yay! you can bunk";
      this.result['icon']="thumbs-up";
      this.result['iconcolor']="secondary";
      this.result['att']="Your current attendance is "+att_per+"%";
      this.result['msg']="you can bunk upto "+parseInt(x)+" classes and yet still maintain attendance at "+target_att+"%";
    }
    else{
      //cant bunk now
      this.result['emotion']="Bunk/Not-Bunk - make your decision!!";
      this.result['icon']="warning";
      this.result['iconcolor']="warning";
      this.result['att']="Your current attendance is "+att_per+"%";
      this.result['msg']="you are at edge of your attendance requirement - try after some more classes!";
    }
  }


  validate_input(k){
    if(parseInt(this.conducted)<parseInt(this.present)){
      this.showAlert("Invalid input","looks like you have exchanged values of conducted and present classes",1);
      return false;
    }
    if(this.percent_radio_cus!="" && k==999){
      if(parseInt(this.percent_radio_cus)>100){
        // this.showAlert("More than 100%?","please check for attendance percentage you want to check for!!",1);
        this.result['emotion']="More than 100%?","please check for attendance percentage you want to check for!!";
        this.result['icon']="thumbs-down";
        this.result['iconcolor']="danger";
        this.result['att']="";
        this.result['msg']="--";
        return false;
      }
    }
    return true;
  }

  radio_change(k){
    if(!this.validate_input(k)){
      return;
    }
    if(k==999){
      this.percent_mode=k;
      this.percent_radio=this.percent_radio_cus;
      this.check_valid_input();
    }
    else{
      this.percent_mode=k;
      this.percent_radio_cus="";
      this.percent_radio=k;
      this.check_valid_input();
    }

  }

  toggle_mod_info(){
    if(this.mod_info==0){
      this.mod_info=1;
    }
    else{
      this.mod_info=0;
    }
  }


  showAlert(title,msg,type) {
    if(type==1){
      return;
    }
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }


  mail(email){
    window.open('mailto:'+email);
  }

}
