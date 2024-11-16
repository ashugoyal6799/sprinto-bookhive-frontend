import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks($filter: BookFilterInput, $limit: Int, $offset: Int) {
    books(filter: $filter, limit: $limit, offset: $offset) {
      items {
        id
        title
        description
        published_date
        author {
          id
          name
        }
      }
      totalCount
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors($filter: AuthorFilterInput, $limit: Int, $offset: Int) {
    authors(filter: $filter, limit: $limit, offset: $offset) {
      items {
        id
        name
        biography
        born_date
        books {
          id
          title
          published_date
        }
      }
      totalCount
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $description: String
    $published_date: String
    $author_id: ID!
  ) {
    createBook(
      title: $title
      description: $description
      published_date: $published_date
      author_id: $author_id
    ) {
      id
      title
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor(
    $name: String!
    $biography: String
    $born_date: String
  ) {
    createAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($input: ReviewInput!) {
    addReview(input: $input) {
      id
      content
      rating
      createdAt
    }
  }
`;

export const GET_REVIEWS_BY_BOOK = gql`
  query GetReviewsByBook($bookId: ID!) {
    reviewsByBook(bookId: $bookId) {
      id
      content
      rating
      createdAt
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String
    $description: String
    $published_date: String
    $author_id: ID
  ) {
    updateBook(
      id: $id
      title: $title
      description: $description
      published_date: $published_date
      author_id: $author_id
    ) {
      id
      title
      description
      published_date
      author {
        id
        name
      }
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor(
    $id: ID!
    $name: String
    $biography: String
    $born_date: String
  ) {
    updateAuthor(
      id: $id
      name: $name
      biography: $biography
      born_date: $born_date
    ) {
      id
      name
      biography
      born_date
    }
  }
`;
