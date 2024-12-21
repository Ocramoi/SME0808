#!/bin/bash

killbg() {
    for p in "${pids[@]}" ; do
        kill "$p";
    done
}

trap killbg EXIT

pids=()
background job 1 &
pids+=($!)
background job 2... &
pids+=($!)
foreground job
