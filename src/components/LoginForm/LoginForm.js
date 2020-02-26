import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import { Button, Input } from '../Utils/Utils'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'
            placeholder='User name'>
          </Input>
        </div>
        <div className='password'>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'
            placeholder='Password'>
          </Input>
        </div>
        <Button type='submit' className='login-button'>
          Login
        </Button>
      </form>
    )
  }
}
