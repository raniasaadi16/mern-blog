import { useEffect, useState } from 'react';
import ErrorAlert from '../ErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory, deleteCategory } from '../../redux/actions/categoryActions';
import { clearErrors } from '../../redux/actions/errorsAction';

export default function Categories() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.category);
    const err = useSelector(state => state.err)
    const [category, setcategory] = useState('');
    useEffect(() => {
        dispatch(clearErrors());
        dispatch(getCategories());
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addCategory({name :category}));
        setcategory('');
    };

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    }

    return (
        <div className='mt-5 container'>
            <div className="bg-white py-4 px-5 rounded">
                <h3 className='primary-color'>Categories: {categories && categories.length}</h3>
                <div className="mt-4 ml-5">
                    {categories && categories.map(category=> (
                        <div key={category._id}>
                             <li className='d-inline-block'>
                                <h4>{category.name}</h4>
                            </li>
                            <button className='btn primary-color d-inline ml-5' onClick={()=> handleDelete(category._id)}>Delete</button>
                        </div>
                    ))}
                    <form onSubmit={handleSubmit} className='mt-4'>
                        <input type="text" placeholder='ADD NEW CATEGORY' className='w-100 p-2 border bg-transparent' value={category} onChange={e => setcategory(e.target.value)} />
                        {err.msg && <ErrorAlert error={err.msg}/>}
                        <button className='bg-pink border-0 mt-2 rounded py-1 px-3' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
