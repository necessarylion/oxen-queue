import { Pool, PoolConnection } from 'mysql2/promise';

export interface MySQLConfig {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
  port?: number;
  timezone?: string;
  [key: string]: any;
}

export interface Job<T> {
  body?: T;
  uniqueKey?: string | number;
  priority?: number;
  startTime?: Date | string | number;
  [key: string]: any;
}

export interface JobResult {
  jobId: number;
  jobBody: any;
  jobType: string;
  jobResult?: any;
}

export interface JobError {
  jobId: number;
  jobBody: any;
  jobType: string;
  error: Error;
}

export interface QueueConfig {
  mysqlConfig: MySQLConfig;
  dbTable?: string;
  extraFields?: string[];
  fastestPollingRate?: number;
  slowestPollingRate?: number;
  pollingBackoffRate?: number;
  onJobSuccess?: (result: JobResult) => Promise<void> | void;
  onJobError?: (error: JobError) => Promise<void> | void;
}

export interface ProcessConfig<T> {
  workFn: (jobBody: T, job: DatabaseJob) => Promise<any> | any;
  concurrency?: number;
  timeout?: number;
  recoverStuckJobs?: boolean;
  maxRetry?: number;
  retryDelay?: number | ((attempt: number) => number);
}

export interface DatabaseJob {
  id: number;
  body: any;
  batch_id?: number;
  job_type: string;
  created_ts: Date;
  started_ts?: Date;
  status: string;
  result?: string;
  recovered: number;
  running_time?: number;
  unique_key?: number;
  priority?: number;
}

export interface QueueDebug {
  processing: boolean;
  inProcess: number;
  currentlyFetching: boolean;
  workingJobBatch: DatabaseJob[];
}

export interface RetryConfig {
  jobId: number;
  retrySeconds: number | ((attempt: number) => number);
  currentTry: number;
}

export interface SuccessConfig {
  jobId: number;
  jobResult: any;
  jobBody: any;
}

export interface ErrorConfig {
  jobId: number;
  error: Error;
  jobBody: any;
}
