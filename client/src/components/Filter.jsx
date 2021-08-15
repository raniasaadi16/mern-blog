import { useState, useEffect} from 'react';
import { useLocation, useHistory} from 'react-router';
import Select from 'react-select';



export default function Filter({searchQuery, setsearchQuey, category}) {
    const search = useLocation().search;
    const history = useHistory();
    const [selectedOption, setselectedOption] = useState({value: 'all', label: 'all'});
    let query;
    let options = [{value: 'all', label: 'all'}];
    category && category.map(cat => {
        options.unshift({value: cat.name, label: cat.name, id:cat._id});
    } );
    
    
    useEffect(() => {
        if(search && !searchQuery){
            setsearchQuey(search);
        }
    }, [])
    useEffect(() => {
        let newselectedOpt;
        category && (newselectedOpt = category.find(cat=> cat._id === search.split('=')[1]));
        newselectedOpt && setselectedOption(newselectedOpt._id && {value: newselectedOpt.name, label: newselectedOpt.name, id: newselectedOpt._id })        
    }, [search, category]);

    const handleChange = (selectedOption) => {
        setselectedOption(selectedOption);
        query = selectedOption.id ? `?category=${selectedOption.id}` : '';
        history.push(query);
        setsearchQuey(query);            
    };
    
    return (
        <div className="filter">
            <span className="ml-4 font-weight-bold">category :</span>
            <div className="d-inline ml-2">
                <Select value={selectedOption} onChange={handleChange} options={options}/>
            </div>
        </div>
    )
}
