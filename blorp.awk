BEGIN {
  print "["
}

have_printed {
  print ","
}

!/^!/ {
  printf "{ \"id\": %d, \"priority\": 1, \"action\": { \"type\": \"block\" }, \"condition\": { \"resourceTypes\": [ \"main_frame\", \"sub_frame\", \"stylesheet\", \"script\", \"image\", \"font\", \"object\", \"xmlhttprequest\", \"ping\", \"csp_report\", \"media\", \"websocket\", \"other\" ], \"urlFilter\": \"%s\" } }", NR, $0
  have_printed = 1
}

END {
  print "]"
}
