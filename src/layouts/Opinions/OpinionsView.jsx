import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CreateOpinion from "./CreateOpinion";
import WithoutData from "../../ui/WithoutData";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import OpinionComponent from "./OpinionComponent";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
//import classes from "./OpinionsView.module.css";

const OpinionsView = (props) => {
  const [opinions, setOpinions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const params = useParams();

  const opinionsType = props.type;
  const opinionsEmpty = opinions.length === 0;
  let lastDoc = useRef();

  const opinionsQueryOptions = useMemo(() => {
    switch (opinionsType) {
      case "explore":
      case "home":
        return [
          collection(db, "opinions"),
          where("parent", "==", null),
          orderBy("publishedDate", "desc"),
          limit(5),
        ];
      case "profile":
        return [
          collection(db, "opinions"),
          where("userId", "==", params.userId),
          orderBy("publishedDate", "desc"),
          limit(5),
        ];
      case "comments":
        return[
          collection(db, "opinions"),
          where("parent", "==", params.parentId),
          orderBy("publishedDate", "desc"),
          limit(5),
        ]
      default:
        return null;
    }
  }, [opinionsType]);

  const fetchData = useCallback(async () => {
    let q;
    if (!lastDoc.current) {
      q = query(...opinionsQueryOptions);
    } else {
      q = query(...opinionsQueryOptions, startAfter(lastDoc.current));
    }
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      setHasMore(false);
      return;
    }
    lastDoc.current = querySnapshot.docs[querySnapshot.docs.length - 1];
    setOpinions((opinions) => {
      return opinions.concat(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  }, [opinionsQueryOptions]);

  useEffect(() => fetchData(), [fetchData]);

  return (
    <div className="py-3">
      {opinionsType === "home" && <CreateOpinion />}
      {opinionsEmpty && <WithoutData />}
      <InfiniteScroll
        dataLength={opinions.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="text-center p-2">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        }
        endMessage={
          <p className="text-center pt-2">
            <b>Ya ha visto todas la opiniones</b>
          </p>
        }
      >
        {opinions.map((opinion) => (
          <OpinionComponent key={opinion.id} element={opinion} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default OpinionsView;
