import React, { Component } from 'react'
import { Button,Divider,Grid,Header,Icon,Search,Segment} from 'semantic-ui-react'
import csv from 'csv';
import Dropzone from 'react-dropzone';
import logo from '../DataExportLogo.png';

class Upload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            informationList: [],
            fileName:[],
        }
    }

    onDrop(files) {
        const {fileName} = this.state
        this.setState({ files });
        var file = files[0];
        console.log("info", files)
        const reader = new FileReader();
        var fileNameStorage = fileName
        !fileNameStorage.includes(file.name)?fileNameStorage.push(file.name):
        this.setState({fileName:fileNameStorage})
        reader.onload = () => {
          csv.parse(reader.result, (err, data) => {
            data.map(element=>{
              console.log("data",element[2])
              let information = element[1]
              let value = element[2]
              fetch('http://localhost:3001/merchants', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({information, value}),
            })
              .then(response => {
                return response.text();
              })
              .then(data => {
                console.log(data);
              });
            })
            // var informationList = [];
            // for (var i = 0; i < data.length; i++) {
            //     let dataFirstColumn = data[i][0]
            //     console.log("data splited", dataFirstColumn)
            //     let dataSplited = dataFirstColumn.split(";")
            //     informationList.push(dataSplited);
            // };
            // this.setState({informationList})
          });
        };
        reader.readAsBinaryString(file);
    }

    render() {
        const {informationList, fileName} = this.state
        console.log("file", fileName)
        return (
          <div>
            <h2 className="subTitle">
            Ville de Paris<img src={logo} style={{ width:70, height:75, paddingTop: 26}}></img>
            <br/>
            <span style={{ fontSize:20, textAlign: "center"}}>Informations de l’espace publique</span>
            </h2>
            <Grid textAlign='center' style={{ height: '60vh'}} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 700}}>
                    <Segment className="segment-color" placeholder>
                        <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical></Divider>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                            <Header> Upload CSV file </Header>
                            <div className="dropzone">
                                <Dropzone className="dropZone-size" accept=".csv" onDropAccepted={this.onDrop.bind(this)}>
                                    <Icon name='upload' />
                                </Dropzone>
                            </div>
                            </Grid.Column>
                            <Grid.Column>
                            <Header>
                                List of uploads
                                <Icon name='world' />
                                </Header>

                                {fileName.map(key=>{
                                    return(
                                        <div className="filesName">
                                            {key}
                                        </div>)
                                })}
                            </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
            </Grid>
          </div>
        )
    }
}

export default Upload;
