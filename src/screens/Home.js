import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Item, Input, Container, Picker} from 'native-base';
import {Fonts} from '../configs/utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {textEllipsis} from '../configs/utils';

import {connect} from 'react-redux';
import fetchTodo from './../_store/todo';
import {
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
} from './../configs/constant';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      index: null,
      title: '',
      isModalVisible: false,
      isEdit: false,
      selected: false,
    };
  }

  componentDidMount() {
    this.handleGetTodos();
  }

  handleGetTodos = () => {
    this.props.fetchTodo(METHOD_GET);
  };

  handleAddTodo = len => {
    const newTodo = {
      userId: 1,
      title: this.state.title,
      completed: false,
    };
    this.props.fetchTodo(METHOD_POST, newTodo, len);
  };

  handleUpdate = () => {
    const newTodo = {
      userId: 1,
      id: this.state.id,
      title: this.state.title,
      completed: this.state.selected,
    };
    if (this.state.id > 200) {
      this.props.todo.data.splice(this.state.index, 1, newTodo);
    } else if (this.state.id > 0) {
      this.props.fetchTodo(
        METHOD_PUT,
        newTodo,
        null,
        this.state.id,
        this.state.index,
      );
    } else {
      alert('Please Enter The Field!');
    }
    this.toggleModal();
  };

  handleDelete = () => {
    this.props.fetchTodo(
      METHOD_DELETE,
      null,
      null,
      this.state.id,
      this.state.index,
    );
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onValueChange = selected => {
    this.setState({
      selected,
    });
  };

  getTodoData = (todo, index, isEdit) => {
    this.setState(
      {selected: todo.completed, id: todo.id, title: todo.title, index, isEdit},
      () => {
        this.toggleModal();
      },
    );
  };

  render() {
    const {todo} = this.props;
    if (todo.error)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{todo.error.message}</Text>
        </View>
      );

    if (todo.isLoading)
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#207561" />
        </View>
      );

    const newData = todo.data.filter(entry => {
      return entry.userId == 1;
    });

    return (
      <Container>
        <StatusBar backgroundColor="#1f6650" barStyle="light-content" />
        <View style={style.container}>
          <View>
            <Item style={style.placeHolder}>
              <Input
                style={style.placeHolderInput}
                placeholder="Enter Your Todo..."
                onChangeText={text => this.setState({title: text})}
              />
              <TouchableOpacity
                onPress={() => this.handleAddTodo(todo.data.length)}>
                <Text style={style.addText}>ADD</Text>
              </TouchableOpacity>
            </Item>
          </View>

          <View>
            <FlatList
              data={newData}
              keyExtractor={item => item.id.toString()}
              onRefresh={() => this.handleGetTodos()}
              refreshing={false}
              renderItem={({item, index}) => {
                let completedIcon;
                if (item.completed) {
                  completedIcon = (
                    <Icon name="check-circle" size={25} color={'green'} />
                  );
                } else {
                  completedIcon = (
                    <Icon name="times-circle" size={25} color={'silver'} />
                  );
                }
                return (
                  <View style={style.list}>
                    {completedIcon}
                    <View style={{flex: 4}}>
                      <Text style={style.textList}>
                        {textEllipsis(item.title, 28)}
                      </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => this.getTodoData(item, index, true)}
                        style={{
                          paddingTop: 2,
                          marginLeft: 5,
                          marginRight: 10,
                        }}>
                        <Icon name="edit" size={25} color={'#000000'} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.getTodoData(item, index, false)}>
                        <Icon name="trash" size={25} color={'#ff0000'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View>
            <Modal
              isVisible={this.state.isEdit ? this.state.isModalVisible : false}>
              <View style={style.Modal}>
                <View style={{alignItems: 'center'}}>
                  <Text style={style.modalText}>EDIT TODO</Text>
                </View>
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                  <Text style={style.editTodo}>Todo</Text>
                  <Item style={style.inputTodo} regular>
                    <Input
                      placeholder="Enter Todo Here"
                      value={this.state.title}
                      onChangeText={text => this.setState({title: text})}
                    />
                  </Item>
                </View>

                <View style={{marginHorizontal: 20, marginTop: 10}}>
                  <Text style={style.editTodo}>Status</Text>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.selected}
                    onValueChange={itemValue => {
                      this.setState({selected: itemValue});
                    }}>
                    <Picker.Item label="Uncompleted" value={false} />
                    <Picker.Item label="Completed" value={true} />
                  </Picker>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    style={style.modalCancel}
                    title="Hide modal"
                    onPress={() => this.toggleModal()}>
                    <Text style={{color: 'white', fontSize: 18}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.handleUpdate()}
                    style={style.modalSave}>
                    <Text style={{color: 'white', fontSize: 18}}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View>
            <Modal
              isVisible={this.state.isEdit ? false : this.state.isModalVisible}>
              <View style={style.Modal}>
                <View style={{alignItems: 'center'}}>
                  <Text style={style.modalText}>DELETE THIS TODO?</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    style={style.modalCancel}
                    title="Hide modal"
                    onPress={() => this.toggleModal()}>
                    <Text style={{color: 'white', fontSize: 18}}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.handleDelete()}
                    style={style.modalSave}>
                    <Text style={{color: 'white', fontSize: 18}}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todo,
  };
};

const mapDispatcToProps = {
  fetchTodo,
};

export default connect(mapStateToProps, mapDispatcToProps)(Home);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#207561',
  },
  placeHolder: {
    backgroundColor: '#fafafa',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  placeHolderInput: {
    paddingLeft: 30,
    fontFamily: Fonts.Poppins,
  },
  addText: {
    backgroundColor: '#ff0000',
    paddingVertical: 5,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 15,
    fontFamily: Fonts.PoppinsBold,
    color: 'white',
  },
  list: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 8,
  },
  textList: {
    fontSize: 18,
    fontFamily: Fonts.Poppins,
    paddingLeft: 10,
  },
  Modal: {
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 20,
    alignContent: 'center',
    fontFamily: Fonts.Poppins,
  },
  inputTodo: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
  },
  editTodo: {
    fontSize: 18,
    marginLeft: 5,
    marginBottom: 5,
    fontFamily: Fonts.Poppins,
  },
  modalSave: {
    backgroundColor: '#1B885D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  modalCancel: {
    backgroundColor: '#DC143C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
