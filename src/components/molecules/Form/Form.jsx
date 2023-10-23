import React, { useState } from 'react'
import ContactService from '../../../services/contact-services';

export const Form = ({user, getContacts}) => {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { title, description } = newPost;
            const newErrors = { title: '', description: '' };
        
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
    
            const result = await ContactService.addContact(data)
            if (result.status === 200) {
                getContacts();
                setNewPost({ ...newPost, title: '', description: '' });
            }
            
        } catch (error) {
            console.log(error);         
        }
    };

    return (
        <div className='container mt-5 pt-5'>
            
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">titulo:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="title" 
                                placeholder="ingresa un titulo"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            />
                            {errors.title && <p className="error-message">{errors.title}</p>}
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripcion:</label>
                            <textarea 
                                className="form-control"
                                name='description'
                                id="description" 
                                rows="3"
                                value={newPost.description}
                                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                            >

                            </textarea>
                            {errors.description && <p className="error-message">{errors.description}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
