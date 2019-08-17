(ns scheduler.core
    (:require ))

(enable-console-print!)

(defn get-day-from-time
  "Creates day using the time object provided"
  [time section]
  (def elem (assoc (js->clj time) :section (dissoc (js->clj section) "meetingInformation")))
  {(get time "day") [elem]}
)

(defn create-schedule-with-section
  "Creates a schedule using the section provided"
  [section]
  (apply merge-with into (for [time (get-in section ["meetingInformation" "times"])] (get-day-from-time time section)))
)

(defn merge-schedule-lists
  "Merges two schedule lists and returns concatenated schedule list"
  [schedule-list-X schedule-list-Y]
  (into []
    (for [x schedule-list-X y schedule-list-Y]
      (merge-with
        (fn [time-a time-b]
          (js/console.log (clj->js time-a) (clj->js time-b))

          (if
            (or (> (get time-a "start") (get time-b "end")) (< (get time-a "end") (get time-b "start"))) (merge-with into time-a time-b)

          ))
        x y)
    ))
)

(defn get-new-schedules-with-sections
  "Gets a new section and previous schedule list as input and returns new schedules with that section added"
  [new-sections old-schedule-list-js]
  (def new-schedule-list (map create-schedule-with-section (js->clj new-sections)))
  (def old-schedule-list (js->clj old-schedule-list-js))
  (cond
    (empty? old-schedule-list) (clj->js new-schedule-list)
    :else (clj->js (merge-schedule-lists old-schedule-list new-schedule-list))
  )
)

