import { useState } from "react";



const RegisterForm = ({ onSubmit }) => {

  const [form, setForm] = useState({});

  const handleChange = e => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  }

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   alert(JSON.stringify(form))
  // }

  return (
    <form onSubmit={(e) => onSubmit(e, form)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          id="passwordConfirmation"
        />
      </div>
      <button
        type="submit"
        className="btn btn-main bg-blue py-2 ttu">Submit</button>
    </form>
  )
};

export default RegisterForm;