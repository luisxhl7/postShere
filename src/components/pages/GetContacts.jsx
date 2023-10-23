import React, { useState } from 'react'
import { useEffect } from 'react'
import ContactService from '../../services/contact-services'
import { Form } from '../molecules/Form/Form'

export const GetContacts = ({user}) => {
  const [contacts, setContacts] = useState(null)
  const [updatePost, setUpdatePost] = useState({
    title: '',
    description: '',
    id: '',
  })
  const [errors, setErrors] = useState({
    title: '',
    description: '',
});
  
  const getContacts = async() => {
    const result = await ContactService.getContacts()
    setContacts(result.data.contacts)
  }

  const deleteContact = async(id) => {
    try {
      await ContactService.deleteContact(id)
      getContacts()
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenupdatePost = (title, description, id) => {
    setUpdatePost({ ...updatePost, title: title, description: description, id: id })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, id } = updatePost;
      const newErrors = { title: '', description: '' };
      console.log('hola')
  
      if (title.trim().length < 3) {
        newErrors.title = 'El titulo debe tener al menos 3 caracteres.';
      }
      if (description.trim().length < 10) {
        newErrors.description = 'La descripcion debe tener al menos 10 caracteres.';
      }
      if (newErrors.title || newErrors.description) {
        setErrors(newErrors);
        return;
      }
  
      const data = {
        title: title,
        description: description,
        user: user
      };

      const result = await ContactService.updateContact(id, data)
      if (result.status === 200) {
        getContacts();
        setUpdatePost({ ...updatePost, title: '', description: '' });
      }
        
    } catch (error) {
      console.log(error);         
    }
};

  useEffect(() => {
    getContacts()
  }, [])
  
  return (
    <div className='container mt-5 '>
      <Form user={user} getContacts={getContacts}/>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <input 
                  type="text" 
                  className="form-control mb-4" 
                  id="title" 
                  placeholder="ingresa un titulo"
                  value={updatePost.title}
                  onChange={(e) => setUpdatePost({ ...updatePost, title: e.target.value })}
                />
                {errors.title && <p className="error-message">{errors.title}</p>}
                <textarea 
                  className="form-control"
                  name='description'
                  id="description" 
                  rows="3"
                  value={updatePost.description}
                  onChange={(e) => setUpdatePost({ ...updatePost, description: e.target.value })}
                ></textarea>
                {errors.description && <p className="error-message">{errors.description}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {contacts?.map( (item, idx) => (
        <div className="card mt-4" key={idx}>
          <div className="card-header d-flex align-items-center justify-content-between">
            {item?.user}
            <br />
            {item?.createdAt}
            {item?.user === user &&
              <div>
                <button
                  className="btn btn-primary m-1"
                  type="button"
                  data-bs-toggle="modal" 
                  data-bs-target="#exampleModal"
                  onClick={() => handleOpenupdatePost(item?.title, item?.description, item?.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>
                <button 
                  className="btn btn-danger m-1"
                  onClick={() => deleteContact(item?.id)}
                  title='Eliminar'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                  </svg>
                </button>
              </div>
            }
          </div>
          <div className="card-body">
            <h5 className="card-title">{item?.title}</h5>
            <p className="card-text">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
