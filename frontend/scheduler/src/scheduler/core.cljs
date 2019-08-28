(ns scheduler.core
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [promesa.core :as p]
            [clojure.pprint :as pp]))

(enable-console-print!)

(defn get-day-from-time
  "Creates day using the time object provided"
  [time section]
  (def elem (assoc time :section (dissoc section :meetingInformation)))
  {(keyword (:day time)) [elem]})

(defn create-schedule-with-section
  "Creates a schedule using the section provided"
  [section]
  (apply merge-with into
    (for [time (:times (:meetingInformation section))]
      (get-day-from-time time section))))

(defn two-times-valid?
  "Checks if two given times conflict"
  [time-A time-B]
  ; (println time-A (:start time-A))
  (or
    (> (:start time-A) (:end time-B))
    (< (:end time-A) (:start time-B))))

(defn is-valid-day?
  "Checks if the given day schedule (list of times) is valid and has no conflicting classes"
  [day]
  ; (println day (count day))
  (cond
    (empty? day) true
    (= (count day) 1) true
    :else
      (cond ;; checks if the first time is valid compared to the rest of the list
        (reduce (fn [accumulator current-time]
          (cond
            (not accumulator) false
            :else (two-times-valid? (first day) current-time)))
          true
          (next day))
        (is-valid-day? (next day)) ;; if the first is valid, check the next ones
        :else false))) ;; if the first is not valid, return false

(defn merge-two-days
  "Merges two given day schedules into one, only if the end result is a valid day schedule"
  [day-A day-B]
  (def merged-day (concat day-A day-B))
  (def is-valid-day (is-valid-day? merged-day))
  (cond is-valid-day merged-day))

(defn merge-schedule-lists
  "Merges two schedule lists and returns concatenated schedule list"
  [schedule-list-X schedule-list-Y]
  (into [] ;; puts all valid merged schedules into an array
    (for [schedule-A schedule-list-X schedule-B schedule-list-Y]  ;; nested for loop, loops through both schedule-list-X and schedule-list-Y
      (merge-with merge-two-days schedule-A schedule-B))))  ;; function passed checks if the two schedules can be merged and returns merged schedule if its valid

(defn get-new-schedules-with-sections
  "Gets a new section and previous schedule list as input and returns new schedules with that section added"
  [old-schedule-list new-sections]
  (def new-schedule-list (map create-schedule-with-section new-sections))
  (cond
    (empty? old-schedule-list) new-schedule-list
    :else (merge-schedule-lists old-schedule-list new-schedule-list)))

(defn get-sections-for-course
  "Does a request to get back json object of course sections"
  [department course]
  (def response (p/promise))
  (go (let [http-response (<!
    (http/post "https://notifymeguelph.xyz/schedule/search"
      {:with-credentials? false :json-params {:course {:department department :course course}}}))]
      (cond
        (= 200 (:status http-response)) (p/resolve! response (:sections (:body http-response)))
        :else (p/resolve! response [])) ;; Could not find any sections for this course
      ))
  response)

(defn get-new-schedules
  "Returns list of new schedules after adding another course to the existing list of schedules"
  [old-schedule-list-js department course]
  (def old-schedule-list (js->clj old-schedule-list-js :keywordize-keys true))
  (p/then (get-sections-for-course department course) (fn [new-sections] (js/console.log (clj->js (get-new-schedules-with-sections old-schedule-list new-sections))))))

(defn fact
  [n]
  (cond
    (or (= n 1) (= n 0)) 1
    :else (* n (fact (- n 1)))))
