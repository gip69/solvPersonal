import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
    olDate: Date;
    times: any = {};
    person: any = {};
    id: number;
//    dropdownValues: DropdownValue[] = [];


    // TODO: Grafik mit Linien analog Weisungen (je nach Zeiten einfärben, wo man sein sollte)

    // TODO dropdown with all ol from solv (next first)
    // TODO save times for ol
    public event: String = 'OL';

    ols: String[] = ['rigi1', 'rigi2', 'jomsl'];

  constructor() { }

  ngOnInit() {
      this.times = JSON.parse(localStorage.getItem('times'));
      this.clear();
  }

    calculate() {
        console.log('calculate'); // 2011-04-11T10:20:30
        // Starttime
        this.times.starttime.time = this.getDate(this.times.starttime.output).getTime();
        // Prestart
        this.times.prestart.time = this.times.starttime.time - this.inMilliseconds(this.times.starttime.wayDuration);
        this.times.prestart.output = this.short(this.getDate(this.times.prestart.time).toLocaleTimeString());
        // Depot
        this.times.depot.time = this.times.prestart.time - this.inMilliseconds(this.times.prestart.duration) - this.inMilliseconds(this.times.prestart.wayDuration);
        this.times.depot.output = this.short(this.getDate(this.times.depot.time).toLocaleTimeString());
        // WKZ
        this.times.wkz.time = this.times.depot.time - this.inMilliseconds(this.times.depot.duration) - this.inMilliseconds(this.times.depot.wayDuration);
        this.times.wkz.output = this.short(this.getDate(this.times.wkz.time).toLocaleTimeString());
        // Destination
        this.times.destination.time = this.times.wkz.time - this.inMilliseconds(this.times.wkz.duration) - this.inMilliseconds(this.times.wkz.wayDuration);
        this.times.destination.output = this.short(this.getDate(this.times.destination.time).toLocaleTimeString());
        // Home
        this.times.home.time = this.times.destination.time - this.inMilliseconds(this.times.destination.duration) - this.inMilliseconds(this.times.destination.wayDuration);
        this.times.home.output = this.short(this.getDate(this.times.home.time).toLocaleTimeString());

        localStorage.setItem('times', JSON.stringify(this.times));
    }

    clear() {
        /*StartCollection.find({}).forEach(function(i, item) {
            let dropdown : DropdownValue = new DropdownValue(item.label, item.label);
            this.dropdownValues.push(dropdown);
        });*/

        console.log('clear');
        this.times = {
            name: 'name',
            home: {time: 0, output: '', location: 'Männedorf'},
            destination: {time: 0, duration: 5, wayDuration: 0, output: ''},
            wkz: {time: 0, duration: 20, wayDuration: 0, output: '', location: ''},
            depot: {time: 0, duration: 0, wayDuration: 0, output: ''},
            prestart: {time: 0, duration: 10, wayDuration: 0, output: ''},
            starttime: {time: 0, wayDuration: 4, output: ''}
        };
        this.calculate();
    }

    save() {
        console.log('save OL');
        /*let olstart = StartCollection.findOne({label: this.times.name});
        if (olstart) {
            // TODO Abfrage wirklich sichern
            StartCollection.update({_id: olstart._id}, {$set: {content: this.times}});
        } else {
            StartCollection.insert({label: this.times.name, content: this.times});
            this.dropdownValues.push(this.times.name);
        }*/
    }

    load(olname) {
        console.log('load OL');
        /*var times = StartCollection.findOne({label: olname});
        if (times !== undefined) {
            this.times = times['content'];

            this.calculate();
        } else {
            console.log('Keinen Eintrag gefunden!');
        }*/
    }

    inMilliseconds(minutes) {
        return minutes * 1000 * 60;
    }

    short(time) {
        return time.substr(0, 5);
    }

    getDate(dateString) {
        switch (dateString.length) {
            case 4:
                dateString = '0' + dateString + ':00';
                break;
            case 5:
                dateString = dateString + ':00';
                break;
            case 6:
                break;
            case 7:
                dateString = '0' + dateString;
        }
        if (dateString.length < 9) {
            let today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; // January is 0!
            var yyyy = today.getFullYear();
            var d = yyyy + '-';
            if (mm < 10) {
                d += '0' + mm;
            } else {
                d += mm;
            }
            if (dd < 10) {
                d += '-0' + dd;
            } else {
                d += '-' + dd;
            }
            d += 'T';
            dateString = d + dateString;
        }
        // console.log("Date: " + dateString);
        return new Date(dateString);
    }
}
