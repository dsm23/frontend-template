#!/bin/bash
set -e

declare -A env_vars

while IFS= read -r line;
  do
    if [[ ! -z "$line" && "$line" == *"="* ]];
      then
        key="${line%%=*}"

        env_vars[$key]="${!key}"
    fi
done < /environment-details/.env.example

to_json() {
  local -n array=$1
  local json="{"
  local first_element=true

  for key in "${!array[@]}"; do
    if [ "$first_element" = true ]; then
      first_element=false
    else
      json+=", "
    fi
    json+="\"$key\":\"${array[$key]}\""
  done

  json+="}"

  echo "$json"
}

json_output=$(to_json env_vars)

sed -i -e "s/\"import_meta_env_placeholder\"/$json_output/g" $1
