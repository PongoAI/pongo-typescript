export interface SearchResult {
    parent_doc_id: string;
    text: string;
    is_parent: boolean;
    metadata: {
      [key: string]: unknown;
    };
    source: string;
    parent_id: string;
    doc_index: number;
    integration_id: string;
    timestamp: number;
    chunk_size: number;
    score: number;
  }