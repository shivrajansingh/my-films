import React, { useEffect, useState, ChangeEvent } from 'react';
import Image from '../common/Image';
import { insertIfNotExists } from '../../utils/helper/FireBaseHelper';
import { setIDB } from 'idbkeyvalue';
import { setWatchlist } from '../../store/action/WatchlistAction';
import { connect } from 'react-redux';
import { watchlist_tables } from '../../utils/constants/tables';
interface NewWatchlistModalProps {
  watchlists: Array<Record<string, any>>;
  addToWatchlistDetails : Record<string, any>;
  setWatchlist: (payload: Array<Record<string, any>>) => void;
}

function NewWatchlistModal(props: NewWatchlistModalProps) {
  const [name, setName] = useState("");
  const [btnText, setBtnText] = useState("Create");
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState('');
  const [isDisabled, setDisable] = useState(false);
  const { wl_lists } = watchlist_tables; 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : {};
    setUser(parsedUser);

  }, []);

  const handleSubmit = async () => {
    if(name === "") return; 
    setBtnText("Creating...");
    const watchlistObj = {
      email: user.email,
      name,
      isPublic: false,
      image : "/assets/images/default.jpg", 
      number_of_movies : '0',
      total_hours : "0 Min"
    };

    await insertIfNotExists(wl_lists, watchlistObj, { email: user.email, name });
    await setIDB(name, watchlistObj, wl_lists);

    props.setWatchlist([...props.watchlists, watchlistObj]);
    setBtnText("Create Watchlist");
    setName("");
    document.getElementById("watchlist-close-btn")?.click(); 
    if(Object.keys(props.addToWatchlistDetails).length > 0){
      document.getElementById("open-assign-movies-to-watchlist")?.click(); 
    }
    let input = document.getElementById("watchlist-name") as HTMLInputElement; 
    input.value =""; 
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/[^a-zA-Z0-9 ]/.test(inputValue)) {
      setDisable(true); 
      setError('Special characters are not allowed.');
    } else {
      setDisable(false); 
      setError('');
    }
    setName(inputValue);
  };

  return (
    <div className="modal" id="new-watchlist">
      <div className="modal-dialog">
        <div className="modal-content bg-black">
          <div className="modal-body bg-black">
            <button type="button" className="btn-close-1 mt-2" id="watchlist-close-btn" data-bs-dismiss="modal" />
            <h5 className="mt-2">Create Watchlist</h5>
            <br />
            <div className="mb-4">
              <label htmlFor="watchlist-name" className="form-label watchlist-label">Watchlist Name</label>
              <input
                type="text"
                className="form-control search-bar-parent mt-1 watchlist-input"
                name="Watchlist Name"
                id="watchlist-name"
                placeholder="Enter Watchlist Name"
                required
                defaultValue={name}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                  }}
              />
              {error && <div className="text-danger">{error}</div>}
            </div>
            <div className="row">
              <div className="col">
                <button className="d-block w-100 atf-btn bg-black cnf-cancel-btn p-1" data-bs-dismiss="modal">
                  <Image src="/assets/images/xcircle-f.svg" /> Cancel
                </button>
              </div>
              <div className="col">
                <button type="button" className="d-block w-100 atf-btn p-1 text-dark bg-theme-yellow" onClick={handleSubmit} disabled={isDisabled}>
                  <Image src="/assets/images/MonitorPlay-f-2.svg" /> {btnText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span data-bs-toggle="modal" id="open-assign-movies-to-watchlist" data-bs-target="#add-movies-to-watchlist"></span>
    </div>
  );
}

function mapStateToProps(state: Record<string, any>) {
  return {
    watchlists: state.WatchlistReducer.watchlists,
    addToWatchlistDetails : state.WatchlistReducer.addToWatchlistDetails
  };
}

export default connect(mapStateToProps, { setWatchlist })(NewWatchlistModal);
