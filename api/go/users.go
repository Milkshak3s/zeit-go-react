package main

import (
	"fmt"
	"net/http"
)

func Users(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "testtesttest")
}
