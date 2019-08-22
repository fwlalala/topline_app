import request from '@/utils/request'

// 获取搜索建议
export const getSuggestions = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearchResults = ({
  page,
  perPage,
  q
}) => {
  return request.get('/app/v1_0/search', {
    params: {
      page: page,
      per_page: perPage,
      q: q
    }
  })
}
