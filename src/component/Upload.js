import React, { Component } from 'react'
import { Button,Divider,Grid,Header,Icon,Search,Segment} from 'semantic-ui-react'
import csv from 'csv';
import Dropzone from 'react-dropzone';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            informationList: [], 
            fileName:[]
        }
    }
    onDrop(files) {
        const {fileName} = this.state
        this.setState({ files });
        var file = files[0];
        const reader = new FileReader();
        var fileNameStorage = fileName
        !fileNameStorage.includes(file.name)?fileNameStorage.push(file.name):
        this.setState({fileName:fileNameStorage})
        reader.onload = () => {
          csv.parse(reader.result, (err, data) => {
            var informationList = [];
            for (var i = 0; i < data.length; i++) {
                let dataFirstColumn = data[i][0]
                let dataSplited = dataFirstColumn.split(";")
                informationList.push(dataSplited);
            };
            this.setState({informationList})
          });
        };
        reader.readAsBinaryString(file);
    }
    
    render() {
        const {informationList, fileName} = this.state
        console.log("file", fileName)
        return (
            <div>
            <h1 className="title"> Informations de l’espace publique </h1>
            <h2 className="subTitle">Ville de Paris </h2>
            <Grid textAlign='center' style={{ height: '60vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
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

export default Upload
