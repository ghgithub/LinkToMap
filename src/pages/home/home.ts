import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var device;
declare var appAvailability: any;
declare var startApp;
let uriAddress: string;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  strAddress: string = '';
  constructor(public navCtrl: NavController) {
  }

  linkByAdress() {
    if (device.platform.toLowerCase() == 'ios') {
      // IOS高德地图
      uriAddress = "iosamap://poi?sourceApplication=applicationName&name=" + this.strAddress;
      appAvailability.check('iosamap://', this.startIOSMapApp(uriAddress), this.notPackage);
    }

    if (device.platform.toLowerCase() == 'android') {
      // 安卓高德地图
      uriAddress = "androidamap://poi?sourceApplication=softname&keywords=" + this.strAddress + "&dev=0";
      appAvailability.check('com.autonavi.minimap', this.startAndroidMapApp('com.autonavi.minimap', uriAddress), this.notPackage);
    }
  }

  //  启动安卓上的地图APP
  startAndroidMapApp(packageName: string, uri: string) {
    try {
      var sApp = startApp.set({  //跳转对应APP 
        "action": "ACTION_VIEW",
        "category": "CATEGORY_DEFAULT",
        "type": "text/css",
        "package": packageName,
        "uri": uri,
        "flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
        "intentstart": "startActivity",
      }, { /* extras */
          "EXTRA_STREAM": "extraValue1",
          "extraKey2": "extraValue2"
        });

      sApp.start(function () { //跳转成功
        console.log('跳转成功！');
      }, function (error) { //失败 
        console.log('跳转失败！失败原因：' + error);
      });
    } catch (error) {
      console.log('打开地图APP失败，请确认是否安装高德地图APP！失败原因：' + error);
      alert('打开地图APP失败，请确认是否安装高德地图APP！');
    }
  }

  // 启动IOS上地图APP
  startIOSMapApp(uri: string) {
    try {
      var sApp = startApp.set(uri);
      sApp.start(function () {
        console.log('跳转成功！');
      }, function (error) {
        console.log('跳转失败！失败原因：' + error);
      });
    } catch (error) {
      console.log('打开地图APP失败，请确认是否安装高德地图APP！失败原因：' + error);
      alert('打开地图APP失败，请确认是否安装高德地图APP！');
    }
  }

  notPackage() {  // 不存在对应APP   
    alert('请确认设备是否已安装高德地图APP！');
  }

}
