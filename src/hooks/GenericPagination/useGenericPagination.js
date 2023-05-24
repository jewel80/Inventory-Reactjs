import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axiosInstance from "../../config/api.config";

const useGenericPagination = (url, withStatus = false) => {
  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();

  const resetStates = () => {
    setTotalElements(0);
    setCurrentPage(1);
    setCollection([]);
  }

  const fetchData = async (
      {
        updatedUrl = null,
        queryObject = {},
        clearSearchQuery = false,
      }
    ) => {
    setLoading(true)
    let $url = ((updatedUrl) ? updatedUrl : url) + getQueryString(queryObject, clearSearchQuery);
    resetStates();
    axiosInstance.get($url)
      .then(res => {
        setCollection(res.data.collection);
        setTotalElements(res.data.totalElements);
        setCurrentPage(res.data.currentPage);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const paginate = async (currentPage) => {
    setCurrentPage(currentPage);
    const queryObject = {
      page: currentPage,
      size: itemsPerPage
    };
    await fetchData({
      queryObject: queryObject
    })
  };

  const getQueryString = (queryObject, clearSearchQuery) => {

    const objectKeys = (queryObject) ? Object.keys(queryObject) : []

    if(! clearSearchQuery) {
      // generating query object from query string
      for(const [param, value] of queryParams.entries()) {
        if(! objectKeys.includes(param)) {
          queryObject[param] = value;
        }
      }
    }

    //setting default query params if needed
    if(! Object.keys(queryObject).includes('page')) {
      queryObject['page'] = currentPage;
    }

    if(! Object.keys(queryObject).includes('size')) {
      queryObject['size'] = itemsPerPage;
    }

    if(withStatus && ! Object.keys(queryObject).includes('statusId')) {
      queryObject['statusId'] = 1;
    }

    if(Object.keys(queryObject).includes('size')) {
      setItemsPerPage(queryObject.size)
    }

    const searchParam = new URLSearchParams(queryObject);

    //updating query parameters on browser url
    setQueryParams(searchParam)

    return `?${searchParam.toString()}`;
  }

  const clearSearch = () => {
    fetchData({
      queryObject: {
        page: 1,
        size: itemsPerPage
      },
      clearSearchQuery: true
    }).then();
  }

  useEffect(() => {
      fetchData({}).then(r => null);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    collection,
    queryParams,
    currentPage,
    itemsPerPage,
    totalElements,
    setQueryParams,
    paginate,
    fetchData,
    clearSearch
  }
}

export default useGenericPagination