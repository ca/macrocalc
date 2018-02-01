import React, { Component } from 'react';
import AppleHealthKit from 'react-native-apple-healthkit';
import { AppRegistry, Switch, Text, StyleSheet, TextInput, View } from 'react-native';

class MacroCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {weight: 0, height: 0, age: 0, male: true};

    let options = {
        permissions: {
            read: ["Height", "Weight", "ActiveEnergyBurned", "DateOfBirth", "BasalEnergyBurned"],
            write: []
        }
    };

    AppleHealthKit.initHealthKit(options: Object, (err: Object, res: Object) => {
        if(err) {
            console.log("error initializing healthkit: ", err);
            return;
        }
        // healthkit initialized...

    });

    // var yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 1);
  }

  getShit(){
    var start = new Date();
    start.setHours(0,0,0,0);

    let energyObject = {
      startDate: (start).toISOString(),
      endDate: (new Date()).toISOString()
    };
    
    let totEnergy = 0;
    let energyPromise = new Promise((resolve, reject)=> {    
      AppleHealthKit.getActiveEnergyBurned(energyObject: Object, (err: Object, res: Object) => {
        if (err) { return; }
        res.forEach(function(element){
          resolve(element.value);
        });        
      })
    })

    energyPromise.then(function(val) {
      console.log("TEST ENERGY: ", val);
      this.setState({ activeEnergyBurned: this.state.activeEnergyBurned += val });
    }).catch(function(val){

    });
  }

  updateActiveEnergy(x) {
    console.log(x);
    this.setState({ activeEnergyBurned: x })
  }

  render() {
    this.getShit
    return (
      <View style={{padding: 10}}>
        <Text style={{padding: 10, fontSize: 42, fontWeight: "bold", textAlign: "center", margin: 20, marginTop: 40}}>
          { this.state.gender ? Math.round(10*this.state.weight*(0.453592) + 6.25*this.state.height*(2.54) - 5*this.state.age + 5) : Math.round(10*this.state.weight*(0.453592) + 6.25*this.state.height*(2.54) - 5*this.state.age - 161) } kcal
        </Text>
        <TextInput
          style={{height: 40, textAlign: "center"}}
          placeholder="Enter your weight in pounds"
          keyboardType="numeric"
          onChangeText={(weight) => this.setState({weight})}
        />
        <TextInput
          style={{height: 40, textAlign: "center"}}
          placeholder="Enter your height in inches"
          keyboardType="numeric"
          onChangeText={(height) => this.setState({height})}
        />
        <TextInput
          style={{height: 40, textAlign: "center"}}
          placeholder="Enter your age in years"
          keyboardType="numeric"
          onChangeText={(age) => this.setState({age})}
        />
        <View style={{flexDirection: "row", justifyContent: "center", alignContent: "center", marginTop: 20}}>
          <Text style={{ lineHeight: 31, fontWeight: "bold", fontSize: 20, color: "lightpink"}}>Female</Text>
          <Switch
            onValueChange={(gender) => this.setState({gender})}
            style={{marginLeft: 10, marginRight: 10}}
            value={this.state.gender} />
          <Text style={{ lineHeight: 31, fontWeight: "bold", fontSize: 20, color: "powderblue"}}>Male</Text>
        </View>
        <Text style={{margin: 20, textAlign: "center", color: "gray"}}>
          This calculator is based on the Mifflin St Jeor Equation for calculating Basal Metabolic Rate, which has been found to be the most accurate!
        </Text>
      </View>
    );
  }
}

class NutritionView extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 2, backgroundColor: 'white', justifyContent:'center'}}>
          <Text style={{textAlign: 'center', fontSize: 56, fontWeight: '900', fontFamily: 'System'}}>185.4lbs</Text>
        </View>
        <View style={{flex: 0.5, flexDirection: 'row', borderTopWidth: 1, borderColor: '#EEE', justifyContent:'center', padding: 10}}>
          <View style={{flex: 1, borderRightWidth: 1, borderColor: '#EEE', justifyContent:'center', padding: 10}}>
            <Text style={{textAlign:'center', alignSelf:'center', fontSize: 18, color: '#4A4A4A'}}>Maintain</Text>
          </View>
          <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
            <Text style={{textAlign:'center', alignSelf:'center', fontSize: 18, color: '#4A4A4A'}}>2,382kcal</Text>
          </View>
        </View>
        <View style={{flex: 0.5, flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#EEE'}}>
          <View style={{backgroundColor: 'white', flex: 1, justifyContent:'center', marginTop: 10, marginBottom:10, borderRightWidth: 1, borderColor: '#EEE'}}>
            <Text style={{textAlign: 'center', fontSize: 20, color:'#4A4A4A'}}>230g</Text>
            <Text style={{textAlign: 'center', fontSize: 14, color:'lightgray'}}>Protein</Text>
          </View>
          <View style={{backgroundColor: 'white', flex: 1, justifyContent:'center', marginTop: 10, marginBottom:10}}>
            <Text style={{textAlign: 'center', fontSize: 20, color:'#4A4A4A'}}>57g</Text>
            <Text style={{textAlign: 'center', fontSize: 14, color:'lightgray'}}>Fat</Text>
          </View>
          <View style={{backgroundColor: 'white', flex: 1, justifyContent:'center', marginTop: 10, marginBottom:10, borderLeftWidth: 1, borderColor: '#EEE'}}>
            <Text style={{textAlign: 'center', fontSize: 20, color:'#4A4A4A'}}>230g</Text>
            <Text style={{textAlign: 'center', fontSize: 14, color:'lightgray'}}>Carbs</Text>
          </View>
        </View>
        <View style={{flex: 2, backgroundColor: 'white'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('macrocalc', () => NutritionView);
