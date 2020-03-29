import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '+15072501199',
        body: 'this is a test message from twilio'
      },
      submitting: false,
      error: false
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch('/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });
  }
  render() {
    return(
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
            />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body"
          value={this.state.message.body}
          onChange={this.onHandleChange}
          />
        </div>
        <button type="submit">
        Send message
        </button>
      </form>
    );
  }


}

export default SMSForm;

 